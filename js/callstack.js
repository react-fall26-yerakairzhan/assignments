// --- Call Stack -----------------------------------------------------------

// We can't read the real JS stack, so we record push/pop events while a
// synchronous recursion runs, then replay them slowly to make it visible.
function traceFactorial(n, events) {
  events.push({ type: 'push', label: `factorial(${n})` });

  if (n <= 1) {
    events.push({ type: 'return', label: `factorial(1) -> 1` });
    events.push({ type: 'pop' });
    return 1;
  }

  const result = n * traceFactorial(n - 1, events); // nested call: deeper frame
  events.push({ type: 'return', label: `factorial(${n}) -> ${result}` });
  events.push({ type: 'pop' });
  return result;
}

async function replay(events) {
  const view = $('#stackView');
  const out = $('#stackOut');
  view.innerHTML = '';
  clear(out);

  for (const ev of events) {
    if (ev.type === 'push') {
      const frame = document.createElement('div');
      frame.className = 'frame';
      frame.textContent = ev.label;
      view.appendChild(frame);
      log(out, `push  ${ev.label}`);
    } else if (ev.type === 'return') {
      log(out, `      ${ev.label}`, 'ok');
    } else {
      view.lastElementChild?.remove();
      log(out, `pop`, 'dim');
    }
    await sleep(350); // pause so the user can watch frames stack up
  }
}

function initCallStack() {
  $('#runFact').onclick = () => {
    const n = Number($('#factN').value);
    const events = [];
    traceFactorial(n, events); // runs instantly, fills the script
    replay(events);            // then we animate it
  };

  // Infinite recursion -> the engine throws RangeError instead of hanging.
  $('#blowStack').onclick = () => {
    const out = $('#stackOut');
    clear(out);
    let depth = 0;
    const recurse = () => { depth++; recurse(); };
    try {
      recurse();
    } catch (err) {
      log(out, `${err.name}: ${err.message}`, 'err');
      log(out, `survived ~${depth} frames before overflow`, 'dim');
    }
  };
}
