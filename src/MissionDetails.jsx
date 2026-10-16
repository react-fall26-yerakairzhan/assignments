function MissionDetails({
  selectedId,
  status,
  mission,
  error,
  isBusy,
  onToggleCompleted,
  onEdit,
  onDelete,
}) {
  if (status === "idle") {
    return <p>Select a mission to see its details.</p>;
  }

  if (status === "loading") {
    return <p>Loading mission #{selectedId}...</p>;
  }

  if (status === "error") {
    return (
      <p className="error">
        Could not load mission #{selectedId}: {error}
      </p>
    );
  }

  let statusText = "Open";
  let toggleText = "Mark as done";
  if (mission.completed) {
    statusText = "Done";
    toggleText = "Reopen";
  }

  return (
    <div>
      <h2>{mission.name}</h2>
      <p>{mission.description}</p>

      <table>
        <tbody>
          <tr>
            <th>Status</th>
            <td>{statusText}</td>
          </tr>
          <tr>
            <th>Priority</th>
            <td>{mission.priority}</td>
          </tr>
          <tr>
            <th>Assignee</th>
            <td>{mission.assignee}</td>
          </tr>
          <tr>
            <th>Sector</th>
            <td>{mission.sector}</td>
          </tr>
          <tr>
            <th>Reward</th>
            <td>{mission.reward} credits</td>
          </tr>
          <tr>
            <th>Deadline</th>
            <td>{mission.deadline}</td>
          </tr>
          <tr>
            <th>Created</th>
            <td>{mission.createdAt}</td>
          </tr>
        </tbody>
      </table>

      <p>
        <button onClick={onToggleCompleted} disabled={isBusy}>
          {toggleText}
        </button>{" "}
        <button onClick={onEdit} disabled={isBusy}>
          Edit
        </button>{" "}
        <button onClick={onDelete} disabled={isBusy}>
          Delete
        </button>
        {isBusy ? " Saving..." : ""}
      </p>
    </div>
  );
}

export default MissionDetails;
