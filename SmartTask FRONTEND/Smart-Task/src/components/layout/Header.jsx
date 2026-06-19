function Header({ title }) {
  const name = localStorage.getItem("userName") || "U";
  const initials = name.charAt(0).toUpperCase();

  return (
    <div className="top-header">
      <h4>{title || "Dashboard"}</h4>
      <div className="user-badge" title={name}>{initials}</div>
    </div>
  );
}

export default Header;