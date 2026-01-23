// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(() => {
//     const stored = localStorage.getItem("auth");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const login = (data) => {
//     setAuth(data);
//     localStorage.setItem("auth", JSON.stringify(data));
//   };

//   const logout = () => {
//     setAuth(null);
//     localStorage.removeItem("auth");
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(null);

//   // 🔁 Restore auth from localStorage on refresh
//   useEffect(() => {
//     const storedAuth = localStorage.getItem("auth");
//     if (storedAuth) {
//       setAuth(JSON.parse(storedAuth));
//     }
//   }, []);

//   // ✅ LOGIN (this is what AdminLogin calls)
//   const login = (data) => {
//     const authData = {
//       token: data.token,
//       committeeId: data.committeeId, // 🔑 THIS IS CRITICAL
//       email: data.email,
//     };

//     setAuth(authData);
//     localStorage.setItem("auth", JSON.stringify(authData));
//   };

//   const logout = () => {
//     setAuth(null);
//     localStorage.removeItem("auth");
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  // ✅ LOGIN (called from AdminLogin)
  const login = (data) => {
    const authData = {
      token: data.token,
      committeeId: data.committeeId,
      email: data.email,
    };

    setAuth(authData);
  };

  // ✅ LOGOUT
  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
