
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "./AdminLogin.css";
import { API_BASE } from "../api";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      login({
        token: data.token,
        committeeId: data.admin.committeeId,
        email: data.admin.email,
      });

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="technical@campusconnect.com"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
<div
  className="demo-box"
  style={{ marginTop: "12px" }}
>
  <div
    className="demo-title"
    style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}
  >
    Demo Credentials
  </div>

  <div style={{ fontSize: "12px", color: "#9ca3af", lineHeight: "1.6" }}>
    technical@campusconnect.com<br />
    cultural@campusconnect.com<br />
    literary@campusconnect.com<br />
    sports@campusconnect.com<br />
    entrepreneur@campusconnect.com
  </div>

  <div
    style={{
      fontSize: "12px",
      color: "#9ca3af",
      marginTop: "6px"
    }}
  >
    Password: admin123
  </div>
</div>



      </div>
    </div>
  );
}

