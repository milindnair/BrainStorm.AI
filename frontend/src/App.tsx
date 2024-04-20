import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./modules/Footer";
import { useNavigate } from "react-router-dom";
import HeaderCard from "./components/HeaderCard";
import RecentQuiz from "./components/RecentQuiz";


import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import Title from "./components/Title";
import { Link, useLocation } from "react-router-dom";
import QuizCard from "./components/QuizCard";

import { getDocs, query, collection, where, getDoc, doc } from "firebase/firestore";
import { db } from "./utils/Firebaseconfig";

// import PdfTextExtractor from './components/PdfTextExtractor'
import BarChart from "./modules/DataVisualization/BarChart";

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
    // Access the quizzes array from localStorage
    const quizzesString = localStorage.getItem("quizzes");
    const quizzesArray = JSON.parse(quizzesString);

    console.log("Quizzes array:", quizzesArray);

    // Iterate over each quiz ID and fetch its corresponding document
    quizzesArray.forEach(async (element) => {
        try {
            console.log("hi")
            const docRef = doc(db, "quizzes", element.id);
            const docSnapshot = await getDoc(docRef);
            
            if (docSnapshot.exists()) {
              const quizData = docSnapshot.data();
              // Omit the extractedText field
              const { extractedText, ...quizWithoutExtractedText } = quizData;
              // Add the quiz object to localStorage
              localStorage.setItem(`${element.id}`, JSON.stringify(quizWithoutExtractedText));
              console.log("Quiz document added to localStorage:", element.id);
            } else {
                console.log("Quiz document with ID", element.id, "does not exist");
            }
        } catch (error) {
            console.error("Error fetching quiz document:", error);
        }
    });
};

  

  const attemptedQuizzes = [
    {
      title: "ABC",
      score: 90,
      category: ["Fill in the blanks"],
      status : "Attempted",
      q_id: "1" 
    },
    {
      title: "EFG",
      score: 70,
      category: ["Fill in the blanks", "Multiple Choice Questions"],
      status : "Attempted",
      q_id: "2"
    },
    {
      title: "HIJ",
      score: 60,
      category: ["Fill in the blanks"],
      status : "Attempted",
      q_id: "3"
    },
    {
      title: "KLM",
      score: 70,
      category: ["Fill in the blanks", "Multiple Choice Questions"],
      status : "Attempted",
      q_id: "4"
    },
  ];

  const generatedQuizzes = [
    {
      title: "GEN1",
      score: 0,
      category: ["Fill in the blanks"],
      q_id: "5"
    },
    {
      title: "GEN2",
      score: 0,
      category: ["Fill in the blanks", "Multiple Choice Questions"],
      q_id: "6"
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
            cursor: "pointer"
          }}
        >
          <Tab
            key="attempted"
            title="Attempted"
            
          >
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
              {attemptedQuizzes.map((quiz, index) => (
                <QuizCard quiz={quiz} key={index} />
              ))}
            </div>
          </Tab>

          <Tab
            key="generated"
            title="Generated"
            
          >
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
              {generatedQuizzes.map((quiz, index) => (
                <QuizCard quiz={quiz} key={index} />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}

export default App;
