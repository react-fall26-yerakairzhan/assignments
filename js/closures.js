// --- Closures -------------------------------------------------------------

// Every call gets a fresh `count` that only the returned functions can reach.
// That private variable IS the closure.
function createCounter() {
  let count = 0;
  return (step) => (count += step);
}

let counterId = 0;

function addCounterCard() {
  const counter = createCounter(); // own scope, independent of other cards
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<small>counter #${++counterId}</small>
    <div class="value">0</div>
    <button class="ghost" data-step="-1">-</button>
    <button data-step="1">+</button>`;

  // Both buttons close over the same `counter` — but a different one per card.
  card.onclick = (e) => {
    const step = e.target.dataset.step;
    if (step) card.querySelector('.value').textContent = counter(+step);
  };
  $('#counters').append(card);
}

// The classic: `var` is function-scoped (one shared box), `let` is
// block-scoped (a new box per iteration), so the callbacks see different values.
function runLoopDemo(kind) {
  const out = $('#loopOut');
  clear(out);
  log(out, `for (${kind} i = 0; i < 3; i++) setTimeout(() => log(i), 0)`, 'dim');

  if (kind === 'var') {
    for (var i = 0; i < 3; i++) setTimeout(() => log(out, `var -> ${i}`, 'err'), 0);
  } else {
    for (let i = 0; i < 3; i++) setTimeout(() => log(out, `let -> ${i}`, 'ok'), 0);
  }
}

function initClosures() {
  $('#addCounter').onclick = addCounterCard;
  $('#resetCounters').onclick = () => (($('#counters').innerHTML = ''), (counterId = 0));
  $('#runVar').onclick = () => runLoopDemo('var');
  $('#runLet').onclick = () => runLoopDemo('let');
  addCounterCard(); // start with one
}
