// Shared helpers + entry point.

const $ = (sel) => document.querySelector(sel);
const clear = (el) => (el.textContent = '');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // async building block

// Append one line to a <pre> log box. `cls` colors it: 'ok' | 'err' | 'dim'.
function log(el, text, cls = '') {
  el.insertAdjacentHTML('beforeend', `<div class="${cls}">${text}</div>`);
  el.scrollTop = el.scrollHeight;
}

// Tabs: highlight the clicked one, show its panel.
document.querySelectorAll('.tab').forEach((tab) => {
  tab.onclick = () => {
    document.querySelectorAll('.tab, .panel').forEach((el) => el.classList.remove('is-active'));
    tab.classList.add('is-active');
    $('#' + tab.dataset.tab).classList.add('is-active');
  };
});

initClosures();
initCallStack();
initPromises();
initEventLoop();
