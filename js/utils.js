// Small shared helpers used by every topic file.

const $ = (sel) => document.querySelector(sel);

// Append one line to a <pre> log box. `cls` colors it: 'ok' | 'err' | 'dim'.
function log(el, text, cls = '') {
  const line = document.createElement('div');
  if (cls) line.className = cls;
  line.textContent = text;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}

const clear = (el) => (el.textContent = '');

// Promise-based delay — the building block for all the async demos.
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
