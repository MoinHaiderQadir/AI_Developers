import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StaffProvider } from "./context/StaffContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StaffProvider>
        <App />
      </StaffProvider>
    </BrowserRouter>
  </StrictMode>
);
