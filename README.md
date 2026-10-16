# Practice 4: Async React (effects and a fake API)

A list of station missions loaded from a fake API with random delays
(0.5–3 s) and random errors (10%). Data is saved in `localStorage`.

```bash
npm install
npm run dev
```

`npm run build` puts a static site in `dist/` that works from any folder.

## Fake API

`src/api/` is the starter from
[leravanna/fake-api](https://github.com/leravanna/fake-api). Two small changes,
marked `CHANGED for practice4`:

- `getItemsList` returns short rows (id, name, priority, completed), so
  the full mission has to be loaded with `getItem(id)`.
- `createItem` keeps all fields, not only name and description.

Only `src/api/` touches `localStorage`. Components just call the API.

## useEffect and dependencies

- The list effect depends on `[reloadCount]`. Reload adds 1 to it, so the effect
  runs again.
- The details effect depends on `[selectedId]`. A new selection loads new
  details.

## Cleanup and race conditions

Each effect has `let ignore = false` and a cleanup that sets it to `true`.
React runs the cleanup before the next effect run. So if you click mission A and
then mission B, A's request is still running but its answer is ignored. The
console logs `Ignored outdated details for mission #…`.

The old details are also cleared as soon as the selection changes, so the panel
shows "Loading..." and never the previous mission.

## Stale closures

`handleToggleCompleted` copies `details.id` into `missionId` before the
`await`. After the `await`, `details` in that closure is old. The user may
already be on another mission. So the result is applied with
functional updates (`setX((current) => ...)`), which get the latest state,
and only to the mission with that id.

While a mission has a request in flight, its id is in `busyIds` and its
buttons are disabled, so two conflicting requests can't be sent.
