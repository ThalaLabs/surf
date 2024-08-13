import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App.tsx";
// Internal components
import { Toaster } from "@/components/ui/toaster.tsx";
import { WalletProvider } from "@/components/WalletProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
      <Toaster />
    </WalletProvider>
  </React.StrictMode>,
);
