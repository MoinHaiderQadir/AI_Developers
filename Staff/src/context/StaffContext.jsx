// src/context/StaffContext.js
import React, { createContext, useContext, useState } from "react";

const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("staff");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <StaffContext.Provider value={{ user, setUser }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => useContext(StaffContext);
