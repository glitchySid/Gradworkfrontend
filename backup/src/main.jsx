import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  const div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);
}

createRoot(rootElement || document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
