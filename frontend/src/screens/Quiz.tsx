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

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
   
  // defining format of quiz for no later errors
  const [currQuiz, setQuiz] = useState({
    categories: ["Category1", "Category2", "..."],
    fitb: {
      keys: ["Correct answer 1", "Correct answer 2"],
      sentences: [
        "Fill in the blank sentence 1",
        "Fill in the blank sentence 2",
      ],
    },
    matchthefollowing: [
      {
        question: "Matching question 1",
        lhs: ["Option 1", "Option 2", "..."],
        rhs: ["Option A", "Option B", "..."],
        answers: [0, 1], 
      },
    ],
    mcq: [
      {
        question: "Multiple choice question 1",
        options: ["Option A", "Option B", "..."],
        correct_answer_index: 1, 
      },
    ],
    truefalse: [
      {
        sentence: "True or False statement 1",
        answer: true, 
      },
    ],
    numQuestions: 10,
    title: "Quiz Title",
  });
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(Date.now());

  const [questions, setQuestions] = useState([{ type: "none" }]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState(
    new Array(questions.length).fill(0) || null
  );
  const [score, setScore] = useState(0);
  const [actualAnswers, setActualAnswers] = useState()

  useEffect(() => {
    const quiz = location.state.quiz;
    setQuiz(quiz);
    console.log(quiz);
  },[]);
 


  useEffect(() => {
    if (currQuiz && currQuestionIndex < questions.length) {
       const timer = setTimeout(() => {
         setCurrQuestionIndex((prevIndex) => (prevIndex + 1));
         setTimerKey(Date.now());
       }, 2000);
       console.log(currQuestionIndex);
       return () => clearTimeout(timer);
    } else  {
       navigate(`/result/${currQuiz.title}`, { state: { quiz: questions, score , correctAnswerIndexes } });
    }
   }, [currQuestionIndex, questions, userAnswers, navigate, currQuiz]);
   


  useEffect(() => {
    if (currQuiz) {
      // access fields of quiz
      const {
        categories,
        fitb,
        matchthefollowing,
        mcq,
        numQuestions,
        title,
        truefalse,
      } = currQuiz;
      const numOfCategories = categories.length;
      const numOfQuestionsPerCategory = Math.floor(
        numQuestions / numOfCategories
      );

      //Randomly select questions
      const randomlySelectedQuestions = (category, numOfQuestionsToSelect) => {
        const selectedQuestions = [];
        const availableQuestions = category.slice();
        for (let i = 0; i < numOfQuestionsToSelect; i++) {
          const randomIndex = Math.floor(
            Math.random() * availableQuestions.length
          );
          const selectedQuestion = availableQuestions[randomIndex];
          selectedQuestions.push(selectedQuestion);
          availableQuestions.splice(randomIndex, 1);
        }
        return selectedQuestions;
      };

      // calling above function for all categories
      const selectedFITBQuestions = randomlySelectedQuestions(
        fitb.sentences.map((sentence, index) => ({
          sentence,
          key: fitb.keys[index],
        })),
        numOfQuestionsPerCategory
      );

      const selectedMTFQuestions = randomlySelectedQuestions(
        matchthefollowing,
        numOfQuestionsPerCategory
      );
      const selectedTrueFalseQuestions = randomlySelectedQuestions(
        truefalse,
        numOfQuestionsPerCategory
      );
      const selectedMCQQuestions = randomlySelectedQuestions(
        mcq,
        numOfQuestionsPerCategory
      );

      const allSelectedQuestions = [
        ...selectedFITBQuestions.map((question) => ({
          ...question,
          type: "FITB",
        })),
        ...selectedMTFQuestions.map((question) => ({
          ...question,
          type: "MTF",
        })),
        ...selectedTrueFalseQuestions.map((question) => ({
          ...question,
          type: "TrueFalse",
        })),
        ...selectedMCQQuestions.map((question) => ({
          ...question,
          type: "MCQ",
        })),
      ];

      const shuffledQuestions = allSelectedQuestions.sort(
        () => Math.random() - 0.5
      );
      // set state variable
      setQuestions(shuffledQuestions);
      const updatedActualAnswers = [...actualAnswers]
      shuffledQuestions.forEach((question, index) => {
        if(question.type === "FITB") {
          updatedActualAnswers.push(
            question.key
          )
        } else if(question.type === "MCQ") {
          updatedActualAnswers.push(
            question.options[question.correct_answer_index]
          )
        } else if(question.type === "TrueFalse") {
          updatedActualAnswers.push(
            question.answer
          )
        } else if(question.type === "MTF"){
          updatedActualAnswers.push(
            question.answers
          )
        }
      }) 
      setActualAnswers(updatedActualAnswers)
      console.log(actualAnswers)
      console.log(shuffledQuestions);
    }
  }, [currQuiz]);

  // handle users answers
  const handleUserInput = (response) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currQuestionIndex] = response;
    setUserAnswers(updatedUserAnswers);
  };


  const handleSubmit = (userAnswers) => {
    const updatedCorrectAnswerIndexes = [...correctAnswerIndexes];

    userAnswers.forEach((answer, index) => {
      if (questions[index].type === "FITB" && answer === questions[index].key) {
        updatedCorrectAnswerIndexes[index] = 1; 
      } else if (
        questions[index].type === "MCQ" &&
        answer ===
          questions[index].options[questions[index].correct_answer_index]
      ) {
        updatedCorrectAnswerIndexes[index] = 1;
      } else if (
        questions[index].type === "TrueFalse" &&
        answer === questions[index].answer
      ) {
        updatedCorrectAnswerIndexes[index] = 1;
      } else if (
        questions[index].type === "MTF" &&
        answer.every((ele, i) => ele === questions[index].answers[i] - 1)
      ) {
        updatedCorrectAnswerIndexes[index] = 1;
      } else {
        updatedCorrectAnswerIndexes[index] = 0; // Incorrect answer
      }
    });
    setCorrectAnswerIndexes(updatedCorrectAnswerIndexes);

    // number of correct answers
    const correctAnswersCount = updatedCorrectAnswerIndexes.reduce(
      (acc, value) => acc + value,
      0
    );

    // finalScore calculation
    const finalScore = (correctAnswersCount / questions.length) * 100;
    setScore(finalScore);
  };

  return (
    currQuiz && (
      <div className="h-full flex flex-col justify-between">
        <Card className="h-[95vh] w-[90vw] mt-5 mx-auto">
          <CardHeader className="">
            <h1 className="text-2xl text-center w-full p-1">
              {currQuiz.title}
            </h1>
          </CardHeader>
          <CardBody className="flex flex-col font-rubik">
            {currQuestionIndex < currQuiz.numQuestions &&  questions && questions[currQuestionIndex].type === "FITB" && (
              <div>
                <h1 className="text-2xl">Question {currQuestionIndex + 1}</h1>
                <p className="text-xl">
                  {questions[currQuestionIndex].sentence}
                </p>
                <FIB onAnswer={handleUserInput}></FIB>
              </div>
            )}
            {currQuestionIndex < currQuiz.numQuestions && questions && questions[currQuestionIndex].type === "MCQ" && (
              <div>
                <h1 className="text-2xl">Question {currQuestionIndex + 1}</h1>
                <p className="text-xl">
                  {questions[currQuestionIndex].question}
                </p>
                <MCQ
                  options={questions[currQuestionIndex].options}
                  onAnswer={handleUserInput}
                ></MCQ>
              </div>
            )}
            {currQuestionIndex < currQuiz.numQuestions && questions && questions[currQuestionIndex].type === "TrueFalse" && (
              <div>
                <h1 className="text-2xl">Question {currQuestionIndex + 1}</h1>
                <p className="text-xl">
                  {questions[currQuestionIndex].sentence}
                </p>
                <TF onAnswer={handleUserInput}></TF>
              </div>
            )}
            {currQuestionIndex < currQuiz.numQuestions && questions && questions[currQuestionIndex].type === "MTF" && (
              <div>
                <h1 className="text-2xl">Question {currQuestionIndex + 1}</h1>
                <p className="text-xl">
                  {questions[currQuestionIndex].question}
                </p>
                <MTF
                  lhs={questions[currQuestionIndex].lhs}
                  rhs={questions[currQuestionIndex].rhs}
                  onAnswer={handleUserInput}
                ></MTF>
              </div>
            )}
            <div className="mx-auto my-auto ">
              <CountdownCircleTimer
                isPlaying={true}
                key={timerKey}
                duration={2}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[10, 5, 2, 0]}
                onComplete={() => {
                  if (currQuestionIndex === questions.length - 1) {
                    console.log("Quiz ended");
                  }
                }}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>
          </CardBody>
          <CardFooter>
            <div className="mt-5 grid w-full">
              <Button
                className="font-rubik bg-[#4836BE] text-white text-lg w-full justify-self-center"
                onClick={() => {
                  if (userAnswers) {
                    handleSubmit(userAnswers);
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  );
}

export default Quiz;
