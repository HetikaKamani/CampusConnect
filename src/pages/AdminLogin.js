
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./AdminLogin.css";

// export default function AdminLogin() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const email = e.target.email.value;

//     // FRONTEND LOGIN SIMULATION (committee-based)
//     if (email.includes("cultural")) login("cultural");
//     else if (email.includes("sports")) login("sports");
//     else if (email.includes("tech")) login("technical");
//     else {
//       alert("Invalid admin email");
//       return;
//     }

//     navigate("/admin/dashboard");
//   };

//   return (
//     <div className="admin-login-page">
//       <div className="admin-login-card">
//         <div className="icon">↳</div>

//         <h2>Admin Login</h2>
//         <p className="subtitle">
//           Sign in to manage your committee&apos;s events
//         </p>

//         <form onSubmit={handleSubmit}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="cultural@campus.edu"
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="••••••••"
//             required
//           />

//           <button type="submit">Sign In</button>
//         </form>

//         <div className="demo">
//           <p>Demo Credentials</p>
//           <span>Tech: tech@campus.edu / admin123</span>
//           <span>Cultural: cultural@campus.edu / admin123</span>
//           <span>Sports: sports@campus.edu / admin123</span>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";
// import "./AdminLogin.css";

// export default function AdminLogin() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/api/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       // Save auth info (token + committee)
//       login({
//         token: data.token,
//         committee: data.committeeId,
//       });

//       navigate("/admin/dashboard");
//     } catch (err) {
//       alert("Server error. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admin-login-page">
//       <div className="admin-login-card">
//         <div className="icon">↳</div>

//         <h2>Admin Login</h2>
//         <p className="subtitle">
//           Sign in to manage your committee&apos;s events
//         </p>

//         <form onSubmit={handleSubmit}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="technical@campusconnect.com"
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="••••••••"
//             required
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         <div className="demo">
//           <p>Demo Credentials</p>
//           <span>technical@campusconnect.com / admin123</span>
//           <span>cultural@campusconnect.com / admin123</span>
//           <span>sports@campusconnect.com / admin123</span>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./AdminLogin.css";

// export default function AdminLogin() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const res = await fetch("http://localhost:5000/api/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Login failed");
//         return;
//       }

//       // REAL LOGIN
//       login({
//         token: data.token,
//         committee: data.committeeId,
//       });

//       navigate("/admin/dashboard");
//     } catch (err) {
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="admin-login-page">
//       <div className="admin-login-card">
//         <h2>Admin Login</h2>

//         <form onSubmit={handleSubmit}>
//           <label>Email</label>
//           <input type="email" name="email" required />

//           <label>Password</label>
//           <input type="password" name="password" required />

//           <button type="submit">Sign In</button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "./AdminLogin.css";

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

      const res = await fetch("http://localhost:5000/api/admin/login", {
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

      // ✅ REAL LOGIN (backend-driven)
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
      </div>
    </div>
  );
}

