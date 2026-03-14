import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1017362972327-pqav6vq3usm8mvpvv7avd1t18uehjpij.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>

  
);
