import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../services/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/Project"),
      API.get("/Task")
    ])
      .then(([pRes, tRes]) => {
        setProjects(pRes.data);
        setTasks(tRes.data);
      })
      .catch((err) => console.error("Dashboard fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const pending    = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const done       = tasks.filter(t => t.status === "Done").length;

  const recentTasks = [...tasks].reverse().slice(0, 5);

  const badgeClass = (status) => {
    if (status === "Done") return "badge-status badge-done";
    if (status === "In Progress") return "badge-status badge-progress";
    return "badge-status badge-pending";
  };

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="text-center text-muted mt-5">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">

      <div className="row g-3 mb-4">
        <div className="col-md-3 col-sm-6">
          <div className="stat-card">
            <div className="stat-icon purple">📁</div>
            <div>
              <p className="stat-label">Total Projects</p>
              <p className="stat-value">{projects.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="stat-card">
            <div className="stat-icon blue">📋</div>
            <div>
              <p className="stat-label">Total Tasks</p>
              <p className="stat-value">{tasks.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="stat-card">
            <div className="stat-icon amber">⏳</div>
            <div>
              <p className="stat-label">Pending</p>
              <p className="stat-value">{pending}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="stat-card">
            <div className="stat-icon green">✅</div>
            <div>
              <p className="stat-label">Completed</p>
              <p className="stat-value">{done}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-7">
          <div className="section-card">
            <h6>Recent Tasks</h6>
            {recentTasks.length === 0 ? (
              <p className="text-muted small">No tasks yet</p>
            ) : (
              recentTasks.map(t => (
                <div className="task-row" key={t.id}>
                  <div>
                    <div className="task-title">{t.title}</div>
                    <div className="task-sub">{t.projectItem?.title || "No project"} · {t.priority} priority</div>
                  </div>
                  <span className={badgeClass(t.status)}>{t.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-md-5">
          <div className="section-card">
            <h6>Task Breakdown</h6>
            {tasks.length === 0 ? (
              <p className="text-muted small">No data yet</p>
            ) : (
              <>
                {[
                  { label: "Pending",     count: pending,    color: "#f59e0b", bg: "#fef3c7" },
                  { label: "In Progress", count: inProgress, color: "#3b82f6", bg: "#dbeafe" },
                  { label: "Done",        count: done,       color: "#22c55e", bg: "#dcfce7" },
                ].map(item => (
                  <div key={item.label} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small style={{ fontWeight: 600, color: "#374151" }}>{item.label}</small>
                      <small style={{ color: "#6b7280" }}>{item.count} / {tasks.length}</small>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 20, height: 8, overflow: "hidden" }}>
                      <div style={{
                        width: tasks.length ? `${Math.round((item.count / tasks.length) * 100)}%` : "0%",
                        background: item.color,
                        height: "100%",
                        borderRadius: 20,
                        transition: "width 0.5s ease"
                      }} />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="section-card mt-3">
            <h6>Projects at a glance</h6>
            {projects.length === 0 ? (
              <p className="text-muted small">No projects yet</p>
            ) : (
              projects.slice(0, 4).map(p => (
                <div className="task-row" key={p.id}>
                  <div className="task-title">📁 {p.title}</div>
                  <small className="text-muted">
                    {tasks.filter(t => t.projectItemId === p.id).length} tasks
                  </small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Dashboard;