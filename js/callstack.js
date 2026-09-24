// --- Call Stack -----------------------------------------------------------

// We can't read the real JS stack, so the recursion records its own
// push/pop events synchronously; we replay them slowly to make it visible.
function factorial(n, events) {
  events.push(['push', `factorial(${n})`]);
  const result = n <= 1 ? 1 : n * factorial(n - 1, events); // deeper frame
  events.push(['pop', `factorial(${n}) -> ${result}`]);
  return result;
}

async function replay(events) {
  const view = $('#stackView');
  const out = $('#stackOut');
  view.innerHTML = '';
  clear(out);

  for (const [type, label] of events) {
    if (type === 'push') view.insertAdjacentHTML('beforeend', `<div class="frame">${label}</div>`);
    else view.lastElementChild.remove();
    log(out, `${type.padEnd(4)} ${label}`, type === 'pop' ? 'ok' : '');
    await sleep(350); // pause so the frames can be watched stacking up
  }
}

function initCallStack() {
  $('#runFact').onclick = () => {
    const events = [];
    factorial(Number($('#factN').value), events); // runs instantly
    replay(events);                               // then we animate it
  };

  // Infinite recursion throws RangeError instead of hanging: the stack is finite.
  $('#blowStack').onclick = () => {
    const out = $('#stackOut');
    clear(out);
    let depth = 0;
    const recurse = () => (depth++, recurse());
    try {
      recurse();
    } catch (err) {
      log(out, `${err.name}: ${err.message}`, 'err');
      log(out, `survived ~${depth} frames before overflow`, 'dim');
    }
  };
}
