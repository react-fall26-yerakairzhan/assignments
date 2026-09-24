// --- Promises & async/await ----------------------------------------------

let failRate = 0.5; // 0..1, set by the slider

// Fake network call: resolves after a random delay, or rejects.
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    const ms = Math.round(200 + Math.random() * 500);
    setTimeout(() => {
      if (Math.random() < failRate) reject(new Error(`user ${id}: network error`));
      else resolve({ id, name: `User ${id}`, ms });
    }, ms);
  });
}

// await inside a loop = sequential retries that read like sync code.
async function fetchWithRetry(id, out, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const user = await fetchUser(id);
      log(out, `ok   attempt ${i}: ${user.name} (${user.ms}ms)`, 'ok');
      return user;
    } catch (err) {
      log(out, `fail attempt ${i}: ${err.message}`, 'err');
      if (i === attempts) throw err; // out of tries -> propagate
      await sleep(200 * i);          // simple backoff
    }
  }
}

// Reject if the promise takes longer than `ms` — Promise.race in action.
const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    sleep(ms).then(() => Promise.reject(new Error(`timed out after ${ms}ms`))),
  ]);

function initPromises() {
  const out = $('#promOut');
  const three = () => [fetchUser(1), fetchUser(2), fetchUser(3)];

  // Wrap a demo: clear the log first, report any rejection at the end.
  const demo = (note, fn) => async () => {
    clear(out);
    log(out, note, 'dim');
    try {
      await fn();
    } catch (err) {
      log(out, `rejected: ${err.message}`, 'err');
    }
  };

  $('#failRate').oninput = (e) => {
    failRate = e.target.value / 100;
    $('#failRateVal').textContent = `${e.target.value}%`;
  };

  $('#fetchOne').onclick = demo('await + retry, 3 attempts', () => fetchWithRetry(1, out));

  // all: parallel, but one rejection kills the whole thing.
  $('#fetchAll').onclick = demo('Promise.all — fails fast if any one rejects', async () => {
    const users = await Promise.all(three());
    users.forEach((u) => log(out, `ok   ${u.name} (${u.ms}ms)`, 'ok'));
  });

  // allSettled: always resolves, you inspect each outcome.
  $('#fetchSettled').onclick = demo('Promise.allSettled — never rejects', async () => {
    const results = await Promise.allSettled(three());
    results.forEach((r, i) =>
      r.status === 'fulfilled'
        ? log(out, `${i + 1} fulfilled: ${r.value.name}`, 'ok')
        : log(out, `${i + 1} rejected:  ${r.reason.message}`, 'err')
    );
  });

  $('#fetchRace').onclick = demo('Promise.race — request vs 300ms timer', async () => {
    const user = await withTimeout(fetchUser(9), 300);
    log(out, `ok   ${user.name} won the race (${user.ms}ms)`, 'ok');
  });
}
