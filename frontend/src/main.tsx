import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./screens/Login.tsx";
import BgImageContainer from "./modules/BgImageContainer.tsx";
import { AuthProvider } from "./utils/AuthProvider.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
      <BgImageContainer>
        
        <Routes >
          
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<App />} />
        </Routes>
        </BgImageContainer>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
