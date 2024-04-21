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
import QuizDetails from "./screens/QuizDetails.tsx";
import Quiz from "./screens/Quiz.tsx";
import Search from "./screens/Search.tsx";
import Leaderboard from "./screens/Leaderboard.tsx";
import Result from "./screens/Result.tsx";
import Explanation from "./screens/Explanation.tsx";

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
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/home" element={<App />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/quizDetails/:qid" element={<QuizDetails />}/>
              <Route path="/quiz/:qid" element={<Quiz />} />
              <Route path="/search" element={<Search />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/result/:qid" element={<Result />} />
              <Route path="/result/:qid/explanation" element={<Explanation />} />
            </Routes>
          </SnackbarProvider>
        </BgImageContainer>
      </BrowserRouter>
    </NextUIProvider>
    </ThemeProvider>
  </React.StrictMode>
);
