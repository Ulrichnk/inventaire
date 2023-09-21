import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "../src/css/index.css";

import { BrowserRouter } from "react-router-dom";
import { InvProvider } from "./helpers/AppContext";

const element: HTMLElement | null = document.getElementById("root");

if (element !== null) {
  const root = ReactDOM.createRoot(element);
  root.render(
    <InvProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InvProvider>
  );
}
