import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./src/index.scss";
import App from "./src/app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
