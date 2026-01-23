


import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { auth, logout } = useAuth(); // ✅ CORRECT
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">CampusConnect</div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/committees">Committees</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/updates">Updates</NavLink>
      </div>

      <div className="admin">
        {!auth ? (
          <NavLink to="/admin/login">Admin Login</NavLink>
        ) : (
          <>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
