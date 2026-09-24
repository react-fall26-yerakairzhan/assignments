// --- Event Loop: macrotasks vs microtasks --------------------------------
// Rule: run sync code -> drain ALL microtasks -> take ONE macrotask -> repeat.

// Expected order: 1, 6 (sync) -> 3, 5, 4 (microtasks) -> 2 (macrotask).
// 5 beats 4 because `then B` is only queued once `then A` has run.
function runEventLoopDemo() {
  const out = $('#loopLog');
  clear(out);

  log(out, '1 sync start');

  setTimeout(() => log(out, '2 macrotask: setTimeout 0', 'err'), 0);

  Promise.resolve()
    .then(() => log(out, '3 microtask: then A', 'ok'))
    .then(() => log(out, '4 microtask: then B', 'ok'));

  queueMicrotask(() => log(out, '5 microtask: queueMicrotask', 'ok'));

  log(out, '6 sync end');
}

// Microtasks queued from microtasks join the SAME drain, so the setTimeout
// waits for all of them even though it was scheduled first.
function runStarvationDemo() {
  const out = $('#loopLog');
  clear(out);

  setTimeout(() => log(out, 'macrotask finally runs (last)', 'err'), 0);

  let level = 0;
  const chain = () => {
    log(out, `microtask level ${++level}`, 'ok');
    if (level < 5) queueMicrotask(chain);
  };
  queueMicrotask(chain);

  log(out, 'sync done', 'dim');
}

function initEventLoop() {
  $('#runLoop').onclick = runEventLoopDemo;
  $('#runStarve').onclick = runStarvationDemo;
}
