import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchProjects = () => {
    API.get("/Project").then((res) => setProjects(res.data));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) { setError("Title is required"); return; }
    try {
      if (editId) {
        await API.put(`/Project/${editId}`, { id: editId, ...form });
      } else {
        await API.post("/Project", form);
      }
      setForm({ title: "", description: "" });
      setEditId(null);
      fetchProjects();
    } catch {
      setError("Something went wrong");
    }
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({ title: p.title, description: p.description || "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await API.delete(`/Project/${id}`);
    fetchProjects();
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ title: "", description: "" });
    setError("");
  };

  return (
    <Layout>
      <h2 className="mb-3">Projects</h2>

      <div className="card p-3 mb-4 shadow-sm">
        <h5>{editId ? "Edit Project" : "Add Project"}</h5>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            className="form-control mb-2"
            placeholder="Project Title"
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
          <button type="submit" className="btn btn-primary me-2">
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {projects.length === 0 ? (
        <div className="card p-3">No Projects Yet</div>
      ) : (
        <div className="row g-3">
          {projects.map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="card p-3 shadow-sm h-100">
                <h5>{p.title}</h5>
                <p className="text-muted small">{p.description || "No description"}</p>
                <div className="mt-auto d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Projects;