import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    projectItemId: ""
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchAll = () => {
    API.get("/Task").then((res) => setTasks(res.data));
    API.get("/Project").then((res) => setProjects(res.data));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.projectItemId) { setError("Please select a project"); return; }
    const payload = { ...form, projectItemId: parseInt(form.projectItemId) };
    try {
      if (editId) {
        await API.put(`/Task/${editId}`, { id: editId, ...payload });
      } else {
        await API.post("/Task", payload);
      }
      setForm({ title: "", description: "", status: "Pending", priority: "Medium", projectItemId: "" });
      setEditId(null);
      fetchAll();
    } catch {
      setError("Something went wrong");
    }
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setForm({
      title: t.title,
      description: t.description || "",
      status: t.status,
      priority: t.priority,
      projectItemId: t.projectItemId.toString()
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await API.delete(`/Task/${id}`);
    fetchAll();
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ title: "", description: "", status: "Pending", priority: "Medium", projectItemId: "" });
    setError("");
  };

  const badgeColor = (status) => {
    if (status === "Done") return "success";
    if (status === "In Progress") return "warning";
    return "secondary";
  };

  return (
    <Layout>
      <h2 className="mb-3">Tasks</h2>

      <div className="card p-3 mb-4 shadow-sm">
        <h5>{editId ? "Edit Task" : "Add Task"}</h5>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            className="form-control mb-2"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="form-control mb-2"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            rows={2}
          />
          <div className="row mb-2">
            <div className="col">
              <select name="status" className="form-select" value={form.status} onChange={handleChange}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
            <div className="col">
              <select name="priority" className="form-select" value={form.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="col">
              <select name="projectItemId" className="form-select" value={form.projectItemId} onChange={handleChange}>
                <option value="">-- Select Project --</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-success me-2">
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {tasks.length === 0 ? (
        <div className="card p-3">No Tasks Yet</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover bg-white">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Project</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{t.projectItem?.title || "—"}</td>
                  <td><span className={`badge bg-${badgeColor(t.status)}`}>{t.status}</span></td>
                  <td>{t.priority}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

export default Tasks;