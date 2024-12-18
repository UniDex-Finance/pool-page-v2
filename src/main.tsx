import { IEthereum } from "@dynamic-labs/ethereum";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";

declare global {
  interface Window {
    ethereum?: IEthereum | undefined;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
