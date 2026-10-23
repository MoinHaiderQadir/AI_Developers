import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

const STORAGE_KEY = "ecoTrackerAdmin";

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem(STORAGE_KEY);
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [admin]);

  // login function will be implemented in your Login component/file and
  // should call setAdmin after successful login

  const logout = () => {
    setAdmin(null);
  };

  const value = {
    admin,
    setAdmin,
    logout,
    isLoggedIn: !!admin,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
