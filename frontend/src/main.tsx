import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./screens/Login.tsx";
import BgImageContainer from "./modules/BgImageContainer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
      <BgImageContainer>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </BgImageContainer>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
