import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./lib/ThemeProvider.tsx";
import "./style/index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
