import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./store/index.js"; // init theme + auth listener ກ່ອນ render
import App from "./app/App.jsx";
import { authActions } from "./store/authStore.js";

authActions.refreshSession();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
