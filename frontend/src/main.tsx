import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./screens/Login.tsx";
import BgImageContainer from "./modules/BgImageContainer.tsx";

import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <BgImageContainer>
          <SnackbarProvider maxSnack={3}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<App />} />
            </Routes>
          </SnackbarProvider>
        </BgImageContainer>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
