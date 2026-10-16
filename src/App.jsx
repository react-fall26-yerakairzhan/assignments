import { useEffect, useState } from "react";
import {
  getItemsList,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "./api/fakeApi.js";
import MissionList from "./MissionList.jsx";
import MissionDetails from "./MissionDetails.jsx";
import MissionForm from "./MissionForm.jsx";

const EMPTY_MISSION = {
  name: "",
  description: "",
  assignee: "",
  sector: "",
  priority: "medium",
  reward: 0,
  deadline: "",
};

function App() {
  const [missions, setMissions] = useState([]);
  const [listStatus, setListStatus] = useState("loading");
  const [listError, setListError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);

  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsStatus, setDetailsStatus] = useState("idle");
  const [detailsError, setDetailsError] = useState("");

  // Ids of missions with a request in flight, so we never send
  // two conflicting requests for the same mission.
  const [busyIds, setBusyIds] = useState([]);
  const [actionError, setActionError] = useState("");

  // "closed", "create" or "edit"
  const [formMode, setFormMode] = useState("closed");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // reloadCount is not used inside; changing it just runs the effect again.
  useEffect(() => {
    let ignore = false;

    setListStatus("loading");

    async function loadList() {
      try {
        const result = await getItemsList("?limit=50");
        if (ignore) {
          return;
        }
        setMissions(result.data);
        setListStatus("success");
      } catch (error) {
        if (ignore) {
          return;
        }
        setListError(error.message);
        setListStatus("error");
      }
    }

    loadList();

    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  useEffect(() => {
    if (selectedId === null) {
      setDetails(null);
      setDetailsStatus("idle");
      return;
    }

    // If another mission is selected before this request finishes,
    // the cleanup sets this to true and the old answer is thrown away.
    let ignore = false;

    setDetails(null);
    setDetailsStatus("loading");

    async function loadDetails() {
      try {
        const mission = await getItem(selectedId);
        if (ignore) {
          console.log("Ignored outdated details for mission #" + mission.id);
          return;
        }
        setDetails(mission);
        setDetailsStatus("success");
      } catch (error) {
        if (ignore) {
          return;
        }
        setDetailsError(error.message);
        setDetailsStatus("error");
      }
    }

    loadDetails();

    return () => {
      ignore = true;
    };
  }, [selectedId]);

  function handleReload() {
    setReloadCount((count) => count + 1);
  }

  async function handleToggleCompleted() {
    // Copy what we need now. By the time the answer comes back the user
    // may be looking at another mission, and `details` here is old.
    const missionId = details.id;
    const nextCompleted = !details.completed;

    setBusyIds((ids) => [...ids, missionId]);
    setActionError("");

    try {
      const updated = await updateItem(missionId, { completed: nextCompleted });

      setMissions((current) =>
        current.map((mission) => {
          if (mission.id !== missionId) {
            return mission;
          }
          return { ...mission, completed: updated.completed };
        }),
      );

      // Only touch the details panel if it still shows this mission.
      setDetails((current) => {
        if (current !== null && current.id === missionId) {
          return updated;
        }
        return current;
      });
    } catch (error) {
      setActionError("Could not update mission #" + missionId + ": " + error.message);
    } finally {
      setBusyIds((ids) => ids.filter((id) => id !== missionId));
    }
  }

  async function handleDelete() {
    const missionId = details.id;

    if (!window.confirm('Delete "' + details.name + '"?')) {
      return;
    }

    setBusyIds((ids) => [...ids, missionId]);
    setActionError("");

    try {
      await deleteItem(missionId);
      setMissions((current) => current.filter((mission) => mission.id !== missionId));

      // The user may have opened another mission while this was deleting.
      setSelectedId((currentId) => {
        if (currentId === missionId) {
          return null;
        }
        return currentId;
      });
    } catch (error) {
      setActionError("Could not delete mission #" + missionId + ": " + error.message);
    } finally {
      setBusyIds((ids) => ids.filter((id) => id !== missionId));
    }
  }

  function openForm(mode) {
    setFormError("");
    setFormMode(mode);
  }

  async function handleCreate(values) {
    setIsSaving(true);
    setFormError("");

    try {
      const created = await createItem(values);
      setFormMode("closed");
      // The server decides the order, so ask it for the list again.
      setReloadCount((count) => count + 1);
      setSelectedId(created.id);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleEdit(values) {
    const missionId = details.id;

    setIsSaving(true);
    setFormError("");

    try {
      const updated = await updateItem(missionId, values);

      setMissions((current) =>
        current.map((mission) => {
          if (mission.id !== missionId) {
            return mission;
          }
          return { ...mission, name: updated.name, priority: updated.priority };
        }),
      );

      // The form covers the page while saving, so the selected
      // mission cannot change and the details can be replaced directly.
      setDetails(updated);
      setFormMode("closed");
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  let form = null;
  if (formMode === "create") {
    form = (
      <MissionForm
        title="New mission"
        mission={EMPTY_MISSION}
        isSaving={isSaving}
        error={formError}
        onSubmit={handleCreate}
        onCancel={() => setFormMode("closed")}
      />
    );
  } else if (formMode === "edit") {
    form = (
      <MissionForm
        title="Edit mission"
        mission={details}
        isSaving={isSaving}
        error={formError}
        onSubmit={handleEdit}
        onCancel={() => setFormMode("closed")}
      />
    );
  }

  return (
    <>
      <h1>Missions</h1>

      <p>
        <button onClick={() => openForm("create")}>New mission</button>{" "}
        <button onClick={handleReload} disabled={listStatus === "loading"}>
          Reload
        </button>
      </p>

      <p className="error">{actionError}</p>

      <div className="layout">
        <div className="list-column">
          <MissionList
            missions={missions}
            status={listStatus}
            error={listError}
            selectedId={selectedId}
            busyIds={busyIds}
            onSelect={setSelectedId}
          />
        </div>

        <div className="details-column">
          <MissionDetails
            selectedId={selectedId}
            status={detailsStatus}
            mission={details}
            error={detailsError}
            isBusy={busyIds.includes(selectedId)}
            onToggleCompleted={handleToggleCompleted}
            onEdit={() => openForm("edit")}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {form}
    </>
  );
}

export default App;
