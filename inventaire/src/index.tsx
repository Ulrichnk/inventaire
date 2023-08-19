import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "../src/css/index.css";
import { BrowserRouter } from "react-router-dom";


// declare global {
//   interface Window {
//     Pusher: any; // Utilisez le type approprié pour Pusher si possible
//   }
// }

// declare global {
//   interface Window {
//     Echo: any; // Utilisez le type approprié pour Pusher si possible
//   }
// }
// window.Pusher = Pusher;
// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'eef1444b7931023414c7',
//   cluster: 'eu', // Par exemple, mt1
//   encrypted: true, // Utilisez une connexion chiffrée (HTTPS)
// });

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
