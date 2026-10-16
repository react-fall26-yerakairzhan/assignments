function MissionForm({ title, mission, isSaving, error, onSubmit, onCancel }) {
  function handleSubmit(event) {
    event.preventDefault();

    // The inputs keep their own values; we read them once, on submit.
    const formData = new FormData(event.target);
    const values = {
      name: formData.get("name"),
      description: formData.get("description"),
      assignee: formData.get("assignee"),
      sector: formData.get("sector"),
      priority: formData.get("priority"),
      reward: Number(formData.get("reward")),
      deadline: formData.get("deadline"),
    };
    onSubmit(values);
  }

  let errorText = null;
  if (error !== "") {
    errorText = <p className="error">Could not save: {error}</p>;
  }

  return (
    <div className="overlay">
      <form className="dialog" onSubmit={handleSubmit}>
        <h2>{title}</h2>

        <label>
          Name
          <input name="name" defaultValue={mission.name} required />
        </label>
        <label>
          Description
          <textarea name="description" defaultValue={mission.description} />
        </label>
        <label>
          Assignee
          <input name="assignee" defaultValue={mission.assignee} />
        </label>
        <label>
          Sector
          <input name="sector" defaultValue={mission.sector} />
        </label>
        <label>
          Priority
          <select name="priority" defaultValue={mission.priority}>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </label>
        <label>
          Reward
          <input
            name="reward"
            type="number"
            min="0"
            defaultValue={mission.reward}
          />
        </label>
        <label>
          Deadline
          <input name="deadline" type="date" defaultValue={mission.deadline} />
        </label>

        {errorText}

        <button type="button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>{" "}
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default MissionForm;
