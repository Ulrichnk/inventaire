import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "../src/css/index.css";
import { BrowserRouter } from "react-router-dom";

const element: HTMLElement | null = document.getElementById("root");

if (element !== null) {
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
