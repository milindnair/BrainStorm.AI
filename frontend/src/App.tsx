import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./modules/Footer";
import { useNavigate } from "react-router-dom";
import HeaderCard from "./components/HeaderCard";
import RecentQuiz from "./components/RecentQuiz";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import QuizCard from "./components/QuizCard";

import {
  getDocs,
  query,
  collection,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./utils/Firebaseconfig";

function App() {
  const [user, setUser] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("name");
    const profilePic = localStorage.getItem("photoURL");
    if (user && profilePic) {
      setUser(JSON.parse(user));
      setUserPhoto(JSON.parse(profilePic));
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("name");
    const profilePic = localStorage.getItem("photoURL");
    if (user && profilePic) {
      setUser(JSON.parse(user));
      setUserPhoto(JSON.parse(profilePic));
      console.log(user, userPhoto);
    }
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const quizzesString = localStorage.getItem("quizzes");
    const quizzesArray = JSON.parse(quizzesString);
   
    console.log("Quizzes array:", quizzesArray);
   
    quizzesArray.forEach(async (element) => {
      try {
        console.log("hi");
         const docRef = doc(db, "quizzes", element.id);
         const docSnapshot = await getDoc(docRef);
   
         if (docSnapshot.exists()) {
           const quizData = docSnapshot.data();
           const { extractedText, ...quizWithoutExtractedText } = quizData;
           localStorage.setItem(
             `${element.id}`,
             JSON.stringify(quizWithoutExtractedText)
           );
           console.log("Quiz document added to localStorage:", element.id);
         } else {
           console.log("Quiz document with ID", element.id, "does not exist");
         }
       } catch (error) {
         console.error("Error fetching quiz document:", error);
       }
    });
   };
   

  const quizzes = [
    {
      id: "ANIMAL2_2024-04-22",
      status: "generated",
    },
    {
      status: "generated",
      id: "Animal_2024-04-21",
    },

  ];

  return (
    <div className="h-[100vh]">
      <div className="pt-5">
        <HeaderCard usrname={user} photoURL={userPhoto} />
      </div>
      <div className="mt-10 ml-[5%]">
        <RecentQuiz usrname={user} />
      </div>
      <div>{/* <BarChart /> */}</div>
      {/* <PdfTextExtractor /> */}
      <div className="w-[90%] mx-auto flex flex-col">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "w-full mt-4 ",
            tab: "font-rubik",
            cursor: "pointer",
          }}
        >
          <Tab key="attempted" title="Attempted">
            <div
              className="overflow-auto max-h-[52vh] bg-transparent"
              style={{
                overflow: "auto",
                maxHeight: "52vh",
                backgroundColor: "transparent",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {quizzes.filter((quiz) => quiz.status === "attempted").length >
              0 ? (
                quizzes
                  .filter((quiz) => quiz.status === "attempted")
                  .map((quiz, index) => <QuizCard quiz={quiz} key={index} />)
              ) : (
                <div className="text-center py-4">
                  <p>No quizzes have been attempted yet.</p>
                  <p>Attempt a quiz to get started!</p>
                </div>
              )}
            </div>
          </Tab>

          <Tab key="generated" title="Generated">
            <div
              className="overflow-auto max-h-[52vh] bg-transparent"
              style={{
                overflow: "auto",
                maxHeight: "52vh",
                backgroundColor: "transparent",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {quizzes.filter((quiz) => quiz.status === "generated").length >
              0 ? (
                quizzes
                  .filter((quiz) => quiz.status === "generated")
                  .map((quiz, index) => <QuizCard quiz={quiz} key={index} />)
              ) : (
                <div className="text-center py-4">
                  <p>No quizzes have been generated yet.</p>
                  <p>Generate a quiz to get started!</p>
                </div>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}

export default App;
