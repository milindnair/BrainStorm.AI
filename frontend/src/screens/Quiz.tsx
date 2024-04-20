import { Card, CardBody, CardHeader, CardFooter, Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/Firebaseconfig";
import FIB from "../modules/optionFormats/FIB";
import MCQ from "../modules/optionFormats/MCQ";
import MTF from "../modules/optionFormats/MTF";
import TF from "../modules/optionFormats/TF";


function Quiz() {
  const [ currQuiz, setQuiz ] = useState({
    "categories": ["Category1", "Category2", "..."],
    "fitb": 
      {
        "keys": ["Correct answer 1", "Correct answer 2"],
        "sentences": ["Fill in the blank sentence 1", "Fill in the blank sentence 2"],
      },
    "matchthefollowing": [
      {
        "question": "Matching question 1",
        "lhs": ["Option 1", "Option 2", "..."],
        "rhs": ["Option A", "Option B", "..."],
        "answers": [0, 1] // Indexes of correct answers
      },
    ],
    "mcq": [
      {
        "question": "Multiple choice question 1",
        "options": ["Option A", "Option B", "..."],
        "correct_answer_index": 1 // Index of correct answer in options array
      },
    ],
    "truefalse": [
      {
        "sentence": "True or False statement 1",
        "answer": true // or false
      },
    ],
    "numQuestions": 10,
    "title": "Quiz Title"
  }
  )
  const [ currQuestionIndex, setCurrQuestionIndex ] = useState(0)
  const [ timerKey, setTimerKey ] = useState(Date.now());

  const [ questions, setQuestions ] = useState({
    fitb: [],
    matchthefollowing: [],
    truefalse: [],
    mcq: []
  })
  

  const getQuizzes = async () => {
    const quizzesString = localStorage.getItem("quizzes");
    const quizzesArray = JSON.parse(quizzesString);
    // console.log(quizzesArray)
    const docRef = doc(db, "quizzes", quizzesArray[0].id)
    const result = (await getDoc(docRef)).data()
    setQuiz(result)
    // console.log(currQuiz)
  }

  useEffect(() => {
    getQuizzes()
  }, [])

  // Timer Coded
  useEffect(() => {
    if(currQuiz) {
      const timer = setTimeout(() => {
        setCurrQuestionIndex((prevIndex) => (prevIndex + 1) % currQuiz.numQuestions)
        setTimerKey(Date.now())
      }, 7000)
      return () => clearTimeout(timer)
    }

  }, [currQuestionIndex, currQuiz])

  //randomly select questions
  useEffect(() => {
    if(currQuiz) { 
      const { categories, fitb, matchthefollowing, mcq, numQuestions, title, truefalse } = currQuiz
      // console.log(categories, fitb, matchthefollowing, mcq, numQuestions, title, truefalse)
      const numOfCategories = categories.length
      const numOfQuestionsPerCategory =  Math.floor(numQuestions / numOfCategories)

      const randomlySelectedQuestions = (category, numOfQuestionsToSelect) => {
        const selectedQuestions = []
        const availableQuestions = category.slice() 
        for(let i = 0; i < numOfQuestionsToSelect; i++) {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          const selectedQuestion = availableQuestions[randomIndex];
          selectedQuestions.push(selectedQuestion);
          availableQuestions.splice(randomIndex, 1);
        }
        return selectedQuestions
      }

      const selectedFITBQuestions = randomlySelectedQuestions(
        fitb.sentences.map((sentence, index) => ({ sentence, key: fitb.keys[index] })), numOfQuestionsPerCategory)
      
      const selectedMTFQuestions = randomlySelectedQuestions(matchthefollowing, numOfQuestionsPerCategory);
      const selectedTrueFalseQuestions = randomlySelectedQuestions(truefalse, numOfQuestionsPerCategory);
      const selectedMCQQuestions = randomlySelectedQuestions(mcq, numOfQuestionsPerCategory);

      const allSelectedQuestions = [
        ...selectedFITBQuestions.map(question => ({ ...question, type: 'FITB' })),
        ...selectedMTFQuestions.map(question => ({ ...question, type: 'MTF' })),
        ...selectedTrueFalseQuestions.map(question => ({ ...question, type: 'TrueFalse' })),
        ...selectedMCQQuestions.map(question => ({ ...question, type: 'MCQ' }))
      ]

      const shuffledQuestions = allSelectedQuestions.sort(() => Math.random() - 0.5);

      setQuestions(shuffledQuestions)
      console.log(shuffledQuestions)
    }
  }, [currQuiz])

  return (
    currQuiz && <div className="h-full flex flex-col justify-between">
    <Card className='h-[95vh] w-[90vw] mt-5 mx-auto'>
        <CardHeader className=''>
          <h1 className="text-2xl text-center w-full p-1">{currQuiz.title}</h1>
        </CardHeader>
        <CardBody className="flex flex-col font-rubik">
        {/* {currQuiz.fitb && 
          <div>
            <h1 className="text-2xl">Question {currQuestionIndex + 1}</h1>
            <p className="text-xl">{currQuiz.fitb.sentences[currQuestionIndex]}</p>
            <FIB></FIB>
          </div>
        } */}
        {/* {
            currQuiz.mcq && 
            <div>
              <h1 className="text-2xl">Question {currQuestionIndex + 1}</h1>
              <p className="text-xl">{currQuiz.mcq[currQuestionIndex].question}</p>
              <MCQ options={currQuiz.mcq[currQuestionIndex].options}></MCQ>
            </div>
        } */}
        {/* {
            currQuiz.truefalse && 
            <div>
              <h1 className="text-2xl">Question {currQuestionIndex + 1}</h1>
              <p className="text-xl">{currQuiz.truefalse[currQuestionIndex].sentence}</p>
              <TF></TF>
            </div>
        } */}
        {
          currQuiz.matchthefollowing && 
          <div>
            <h1 className="text-2xl">Question {currQuestionIndex + 1}</h1>
            <p className="text-xl">{currQuiz.matchthefollowing[currQuestionIndex].question}</p>
            <MTF lhs={currQuiz.matchthefollowing[currQuestionIndex].lhs} rhs={currQuiz.matchthefollowing[currQuestionIndex].rhs}></MTF>
          </div>
        }
        <div className="mx-auto my-auto ">
          <CountdownCircleTimer
            isPlaying={true}
            key={timerKey}
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
              if (currQuestionIndex === currQuiz.numQuestions - 1) {
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
                >
                    Submit
                </Button>
            </div>
        </CardFooter>
    </Card>
  </div>  
  ) 
}

export default Quiz