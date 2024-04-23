import { Card, Spinner } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

const riddles = [
  {
    question:
      "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    hint: "Think of something that can communicate without being alive.",
    answer: "Echo",
  },
  {
    question: "What has keys but can't open locks?",
    hint: "Think of something that can hold information but isn't a physical object.",
    answer: "Computer",
  },
  {
    question: "What has a heart that doesn't beat?",
    hint: "Think of something that can have a heart but isn't alive.",
    answer: "Artichoke",
  },
  {
    question: "What has a single eye but cannot see?",
    hint: "Think of something that can have an eye but isn't alive.",
    answer: "Needle",
  },
  {
    question: "What gets wetter the more it dries?",
    hint: "Think of something that can get wet but isn't water.",
    answer: "Towel",
  },
  {
    question: "What has a single eye but cannot see?",
    hint: "Think of something that can have an eye but isn't alive.",
    answer: "Needle",
  },
  {
    question: "What has a heart that doesn't beat?",
    hint: "Think of something that can have a heart but isn't alive.",
    answer: "Artichoke",
  },
  {
    question: "What has many keys but can't open any doors?",
    hint: "Think of something that can hold information but isn't a physical object.",
    answer: "Piano",
  },
  {
    question: "What has a single eye but cannot see?",
    hint: "Think of something that can have an eye but isn't alive.",
    answer: "Needle",
  },
  {
    question: "What has a heart that doesn't beat?",
    hint: "Think of something that can have a heart but isn't alive.",
    answer: "Artichoke",
  },
  {
    question: "What has many keys but can't open any doors?",
    hint: "Think of something that can hold information but isn't a physical object.",
    answer: "Piano",
  },
  {
    question: "What has a single eye but cannot see?",
    hint: "Think of something that can have an eye but isn't alive.",
    answer: "Needle",
  },
  {
    question: "What has a heart that doesn't beat?",
    hint: "Think of something that can have a heart but isn't alive.",
    answer: "Artichoke",
  },
  {
    question: "What has many keys but can't open any doors?",
    hint: "Think of something that can hold information but isn't a physical object.",
    answer: "Piano",
  },
  {
    question: "What has a single eye but cannot see?",
    hint: "Think of something that can have an eye but isn't alive.",
    answer: "Needle",
  },
];
const Loader = () => {
    const [currentRiddle, setCurrentRiddle] = useState(riddles[0]);
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false); // New state for showing the answer
   
    const giveHint = () => {
       setShowHint(true);
    };
   
    const refreshQuestion = () => {
       const randomIndex = Math.floor(Math.random() * riddles.length);
       setCurrentRiddle(riddles[randomIndex]);
       setShowHint(false); // Reset hint visibility
       setShowAnswer(false); // Also reset answer visibility
    };
   
    const showAnswerFunction = () => {
       setShowAnswer(true); // Toggle the visibility of the answer
    };
   
    return (
       <Card className="bg-white mx-4 p-4 rounded-lg shadow-md">
         <h2 className="text-2xl font-rubik font-bold mb-4">
           Tired of Waiting? Why not guess this?
         </h2>
         <p className="text-lg font-rubik mb-4">{currentRiddle.question}</p>
         {showHint && (
           <p className="text-base font-rubik mb-4">{currentRiddle.hint}</p>
         )}
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 min-w-[80%] my-2" onClick={giveHint}>
           Give Hint
         </button>
         <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 min-w-[80%] my-2" onClick={refreshQuestion}>
           Refresh Question
         </button>
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 min-w-[80%] my-2" onClick={showAnswerFunction}>
           Show Answer
         </button>
         {showAnswer && (
           <p className="text-base font-rubik mb-4">The answer is: {currentRiddle.answer}</p>
         )}
         <Spinner
           label="Creating Quiz..."
           color="warning"
           className="text-red-400"
         />
       </Card>
    );
   };
   


export default Loader;
