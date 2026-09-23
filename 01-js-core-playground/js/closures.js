// --- Closures -------------------------------------------------------------

// Factory: every call creates a fresh `count` that only the returned
// functions can reach. That private variable IS the closure.
function createCounter(start = 0) {
  let count = start;
  return {
    inc: () => ++count,
    dec: () => --count,
    get: () => count,
  };
}

let counterId = 0;

function addCounterCard() {
  const counter = createCounter();     // own scope, independent of other cards
  const id = ++counterId;

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <small>counter #${id}</small>
    <div class="value">0</div>
    <button class="minus ghost">-</button>
    <button class="plus">+</button>`;

  const value = card.querySelector('.value');
  // Both handlers close over the same `counter`, but a different one per card.
  card.querySelector('.plus').onclick = () => (value.textContent = counter.inc());
  card.querySelector('.minus').onclick = () => (value.textContent = counter.dec());

  $('#counters').appendChild(card);
}

// The classic interview demo: var leaks out of the loop, let does not.
function runLoopDemo(kind) {
  const out = $('#loopOut');
  clear(out);
  log(out, `for (${kind} i = 0; i < 3; i++) setTimeout(() => log(i), 0)`, 'dim');

  if (kind === 'var') {
    // One `i` shared by all three callbacks; by the time they run it is 3.
    for (var i = 0; i < 3; i++) setTimeout(() => log(out, `var  -> ${i}`, 'err'), 0);
  } else {
    // `let` creates a new binding each iteration, so each callback keeps its own.
    for (let j = 0; j < 3; j++) setTimeout(() => log(out, `let  -> ${j}`, 'ok'), 0);
  }
}

function initClosures() {
  $('#addCounter').onclick = addCounterCard;
  $('#resetCounters').onclick = () => {
    $('#counters').innerHTML = '';
    counterId = 0;
  };
  $('#runVar').onclick = () => runLoopDemo('var');
  $('#runLet').onclick = () => runLoopDemo('let');

  addCounterCard(); // start with one
}
