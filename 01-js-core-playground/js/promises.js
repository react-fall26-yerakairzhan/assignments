// --- Promises & async/await ----------------------------------------------

let failRate = 0.5; // 0..1, controlled by the slider

// Fake network call: resolves after a random delay, or rejects.
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    const delay = 200 + Math.random() * 500;
    setTimeout(() => {
      if (Math.random() < failRate) reject(new Error(`user ${id}: network error`));
      else resolve({ id, name: `User ${id}`, ms: Math.round(delay) });
    }, delay);
  });
}

// await inside a loop = sequential retries, reads like sync code.
async function fetchWithRetry(id, out, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const user = await fetchUser(id);
      log(out, `ok   attempt ${i}: ${user.name} (${user.ms}ms)`, 'ok');
      return user;
    } catch (err) {
      log(out, `fail attempt ${i}: ${err.message}`, 'err');
      if (i === attempts) throw err;     // out of tries -> propagate
      await sleep(200 * i);              // simple backoff
    }
  }
}

// Reject if the promise takes longer than `ms` — Promise.race in action.
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

function initPromises() {
  const out = $('#promOut');
  const slider = $('#failRate');

  slider.oninput = () => {
    failRate = slider.value / 100;
    $('#failRateVal').textContent = `${slider.value}%`;
  };

  $('#fetchOne').onclick = async () => {
    clear(out);
    try {
      await fetchWithRetry(1, out);
    } catch (err) {
      log(out, `gave up: ${err.message}`, 'err');
    }
  };

  // all: parallel, but one rejection kills the whole thing.
  $('#fetchAll').onclick = async () => {
    clear(out);
    log(out, 'Promise.all — fails fast if any one rejects', 'dim');
    try {
      const users = await Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]);
      users.forEach((u) => log(out, `ok   ${u.name} (${u.ms}ms)`, 'ok'));
    } catch (err) {
      log(out, `rejected: ${err.message}`, 'err');
    }
  };

  // allSettled: always resolves, you inspect each outcome.
  $('#fetchSettled').onclick = async () => {
    clear(out);
    log(out, 'Promise.allSettled — never rejects', 'dim');
    const results = await Promise.allSettled([fetchUser(1), fetchUser(2), fetchUser(3)]);
    results.forEach((r, i) =>
      r.status === 'fulfilled'
        ? log(out, `${i + 1} fulfilled: ${r.value.name}`, 'ok')
        : log(out, `${i + 1} rejected:  ${r.reason.message}`, 'err')
    );
  };

  $('#fetchRace').onclick = async () => {
    clear(out);
    log(out, 'Promise.race — request vs 300ms timer', 'dim');
    try {
      const user = await withTimeout(fetchUser(9), 300);
      log(out, `ok   ${user.name} won the race (${user.ms}ms)`, 'ok');
    } catch (err) {
      log(out, `lost: ${err.message}`, 'err');
    }
  };
}
