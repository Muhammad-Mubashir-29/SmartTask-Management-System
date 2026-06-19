import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        Smart<span>Task</span>
      </div>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className={path === "/dashboard" ? "active" : ""}>
          📊 Dashboard
        </Link>
        <Link to="/projects" className={path === "/projects" ? "active" : ""}>
          📁 Projects
        </Link>
        <Link to="/tasks" className={path === "/tasks" ? "active" : ""}>
          ✅ Tasks
        </Link>
      </nav>
      <div className="sidebar-footer">
        <button onClick={logout}>🚪 Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;