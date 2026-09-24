# 01 — JS Core Playground

Vanilla HTML/CSS/JS practice for: Closures, Call Stack, Promises, async/await, Event Loop (tasks & microtasks).

## Run

Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8777
```

## Files

| File | Topic |
|---|---|
| `js/closures.js` | counter factory (private state) + `var` vs `let` in a loop |
| `js/callstack.js` | recursion traced and replayed as stack frames + stack overflow |
| `js/promises.js` | fake API, retry with `await`, `all` / `allSettled` / `race` timeout |
| `js/eventloop.js` | sync → microtasks → macrotask ordering + microtask starvation |
| `js/app.js` | helpers (`$`, `log`, `sleep`), tab switching, init |

## Things to try

1. Open two counters — each keeps its own `count`. That's the closure.
2. Guess the Event Loop output order *before* clicking run.
3. Set fail chance to 100% and watch retries give up.
