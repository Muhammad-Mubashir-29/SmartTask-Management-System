import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/Auth/register", formData);
      navigate("/");
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f2f5" }}>
      <div style={{ background: "white", borderRadius: 16, padding: "36px", width: 380, border: "1px solid #e5e7eb" }}>
        <h2 style={{ fontWeight: 700, marginBottom: 4, color: "#1a1d2e" }}>Create account</h2>
        <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>Start managing your tasks</p>
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Name</label>
            <input type="text" name="name" className="form-control" placeholder="Your name" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Email</label>
            <input type="email" name="email" className="form-control" placeholder="you@example.com" onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-semibold">Password</label>
            <input type="password" name="password" className="form-control" placeholder="••••••••" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-dark w-100 py-2" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="mt-3 text-center small text-muted">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;