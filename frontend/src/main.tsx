import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./screens/Login.tsx";
import BgImageContainer from "./modules/BgImageContainer.tsx";

import { SnackbarProvider } from "notistack";
import CreateQuiz from "./screens/CreateQuiz.tsx";
import { ThemeProvider } from "@material-tailwind/react";
import ProfilePage from "./screens/ProfilePage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
    <NextUIProvider>
      <BrowserRouter>
        <BgImageContainer>
          <SnackbarProvider maxSnack={3}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route  path="/login" element={<Login />} />
              <Route path="/home" element={<App />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/profile-attempted" element={<ProfilePage />} />
              <Route path="/profile-generated" element={<ProfilePage />} />
            </Routes>
          </SnackbarProvider>
        </BgImageContainer>
      </BrowserRouter>
    </NextUIProvider>
    </ThemeProvider>
  </React.StrictMode>
);
