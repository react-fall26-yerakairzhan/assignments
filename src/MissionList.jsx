function MissionList({ missions, status, error, selectedId, busyIds, onSelect }) {
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p className="error">Could not load missions: {error}</p>;
  }

  if (missions.length === 0) {
    return <p>No missions yet.</p>;
  }

  return (
    <ul className="list">
      {missions.map((mission) => (
        <li key={mission.id}>
          <button
            className={mission.id === selectedId ? "selected" : ""}
            onClick={() => onSelect(mission.id)}
          >
            <span className={mission.completed ? "done" : ""}>
              {mission.name}
            </span>
            {busyIds.includes(mission.id) ? " (saving...)" : ""}
            <span className="priority">{mission.priority}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default MissionList;
