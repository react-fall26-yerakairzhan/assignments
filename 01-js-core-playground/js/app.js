// Entry point: wire up tabs, then let each topic module set itself up.

function initTabs() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.onclick = () => {
      document.querySelectorAll('.tab, .panel').forEach((el) => el.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.getElementById(tab.dataset.tab).classList.add('is-active');
    };
  });
}

initTabs();
initClosures();
initCallStack();
initPromises();
initEventLoop();
