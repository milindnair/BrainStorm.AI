import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/Firebaseconfig";
import FIB from "../modules/optionFormats/FIB";
import MCQ from "../modules/optionFormats/MCQ";
import MTF from "../modules/optionFormats/MTF";
import TF from "../modules/optionFormats/TF";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Explanation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [explanation, setExplanation] = useState("Eukaryotic refers to cells that have a membrane-bound nucleus and membrane-bound organelles, which includes organisms such as plants, animals, fungi, and protists. However, since the correct answer is undefined, it is impossible to accurately define what eukaryotic are.");
  // defining format of quiz for no later errors
  const [currQuiz, setQuiz] = useState({
    sentence:
      "People of different religions such as Hinduism, Buddhism, Jainism, Sikhism, Islam, Christianity and Judaism lives together from  _________ .",
    key: "ancient times",
    type: "FITB",
  });

  useEffect(() => {
    // Make API request when component mounts
    async function fetchExplanation() {
      try {
        console.log("Fetching explanation for question:", location.state.question);
        let questionText = "";
        if (location.state.question.sentence) {
          questionText = location.state.question.sentence;
        } else if (location.state.question.question) {
          questionText = location.state.question.question;
        }
  
        const response = await axios.post("http://localhost:8000/explanation", {
          question: questionText,
          answer: location.state.question.key,
        //   summary: "Your summary here", // Replace "Your summary here" with actual summary
        });
        setExplanation(response.data.explanation);
        console.log(explanation);
      } catch (error) {
        console.error("Error fetching explanation:", error);
      }
    }
  
    fetchExplanation();
  }, [location.state.question]);
  

  useEffect(() => {
    console.log("Location State: ", location.state);
    // const question = location.state.question;
    // setQuiz(question);

    // console.log(currQuiz);
  }, []);

  //   return(
  //     currQuiz ? <div>{currQuiz.sentence}</div> : <div>loading...</div>
  //   )

  return (
    currQuiz && (
      <div className="h-full flex flex-col justify-between">
        <Card className="h-[95vh] w-[90vw] mt-5 mx-auto">
          {location.state.question.type == "FITB" && (
            <div className="p-2">
              <p className="text-xl font-rubik pt-5 ">Question: {location.state.question.sentence}</p>
              <p className="text-lg font-rubik mt-3">
                Your Answer: {location.state.userAnswers[location.state.index]}
              </p>
              <p className="text-lg font-rubik ">
                Correct Answer:{" "}
                {location.state.actualAnswers[location.state.index]}
              </p>
              <p className="text-lg font-rubik mt-5">Explanation: {explanation}</p>
            </div>
          )}
          {location.state.question.type == "MCQ" && (
            <div className="p-2">
              <p className="text-xl font-rubik pt-5 ">Question: {location.state.question.question}</p>
              <p className="text-lg font-rubik mt-3">
                Your Answer: {location.state.userAnswers[location.state.index]}
              </p>
              <p className="text-lg font-rubik ">
                Correct Answer:
                {location.state.actualAnswers[location.state.index]}
              </p>
              <p className="text-lg font-rubik mt-5">Explanation: {explanation}</p>
            </div>
          )}
          {
            location.state.question.type == "TrueFalse" && (
              <div className="p-2">
                <p className="text-xl font-rubik pt-5 ">Question: {location.state.question.sentence}</p>
                <p className="text-lg font-rubik mt-3">
                  Your Answer: {location.state.userAnswers[location.state.index]}
                </p>
                <p className="text-lg font-rubik ">
                  Correct Answer:{" "}
                  {location.state.actualAnswers[location.state.index]}
                </p>
             
                <p className="text-lg font-rubik mt-5">Explanation: {explanation}</p>
          
              </div>
            )
          }
        </Card>
      </div>
    )
  );
}

export default Explanation;
