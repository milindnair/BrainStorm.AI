import { Card, CardBody, CardHeader, CardFooter, Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/Firebaseconfig";
import FIB from "../modules/optionFormats/FIB";
import MCQ from "../modules/optionFormats/MCQ";
import MTF from "../modules/optionFormats/MTF";
import TF from "../modules/optionFormats/TF";


function Quiz() {
  const quiz = {
    q_id: "1",
    title: "ABC",
    score: 75,
    category: ["FIB", "MCQ", "TF", "MTF"],
    numQuestions: 10,
    quizDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sint repellat quam dolor enim qui",
    fitb: {
      keys:["ashfadasf", "qtuqetoqe", "tjhbdgknb"], 
      sentences: [
        "Rajasthan is full of desert,  _________ , lakes, dense forest, attractive oases, and temples, etc.",
        "India is a great country where  _________  but the national language is Hindi.",
        "In Jammu and Kashmir, u can enjoy boating, skiing, skating, mountaineering,  _________ , fishing, snowfall, etc."
      ]
    }
  }



  const { qid } = useParams()
  const { Qno } = useParams()

  const [currQuiz, setQuiz] = useState(null)

  const getQuiz = async () => {
    const docRef = doc(db, "quizzes", "test3_2024-04-20")
    const result = await getDoc(docRef)
    const quizData = result.data()
    setQuiz(quizData)
  }


  
  useEffect(() => {
    getQuiz()
  }, [])
  
  const [ questions, setQuestions ] = useState([])

  if(currQuiz){
    const numQuestions = currQuiz.numQuestions
    const fitb = currQuiz.fitb ? currQuiz.fitb : null
    const mtf = currQuiz.matchthefollowing ? currQuiz.matchthefollowing : null
    const tf = currQuiz.truefalse ? currQuiz.truefalse : null
    const mcq = currQuiz.mcq ? currQuiz.mcq : null
    const categories = currQuiz.categories
    const noOfQuestionsEach = numQuestions / categories.length
  }

  const [currQuestionIndex, setCurrQuestionIndex] = useState(0)
  const [timerKey, setTimerKey] = useState(Date.now());
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrQuestionIndex((prevIndex) => (prevIndex + 1) % currQuiz.numQuestions)
      setTimerKey(Date.now())
    }, 7000)


    return () => clearTimeout(timer)
  }, [currQuestionIndex, quiz.fitb])



  return (
    currQuiz && <div className="h-full flex flex-col justify-between">
    <Card className='h-[95vh] w-[90vw] mt-5 mx-auto'>
        <CardHeader className=''>
          <h1 className="text-2xl text-center w-full p-1">{quiz.title}</h1>
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
        <div className="mx-auto my-auto ">
          <CountdownCircleTimer
            isPlaying={true}
            key={timerKey}
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
              console.log(currQuestionIndex)
              if (currQuestionIndex === quiz.fitb.sentences.length - 1) {
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