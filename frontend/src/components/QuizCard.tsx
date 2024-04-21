import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { CircularProgress } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { set } from "firebase/database";

type Props = {
  quiz: {
    id: string;
    status: string;
  };
};

function QuizCard(props: Props) {
  const loc = useLocation();
  const navigation = useNavigate();
  const [quizData, setQuizData] = useState({});

  useEffect(() => {
    console.log("QuizCard props:", props);
    let data = localStorage.getItem(props.quiz.id);
    if(data) {
      setQuizData(JSON.parse(data));
    }
    console.log("QuizData: ", quizData);
  }, []);

  useEffect(() => {
    console.log("QuizData: ", quizData);
  }, [quizData]);

  const handleQuizClick = () => {
    console.log("handleQuizClick");
    navigation(`/quizDetails/${props.quiz.id}`);
  };

  return (
    <div className="mt-5 w-[90%] mx-auto grid justify-items-center font-rubik ">
      <Card
        className={
          props.quiz.status == "Attempted" ? "bg-[#9ff5d8]" : "bg-[#fff9db]"
        }
        style={{ cursor: "pointer" }}
      >
        <CardHeader className="w-[90vw] flex flex-row justify-between">
          <div className="w-[55%]">
            <h1 className="text-2xl">{quizData.title}</h1>
          </div>
          {props.quiz.status == "Attempted" ? (
            <div className="flex items-center gap-2" onClick={handleQuizClick}>
              <IoReload />
              <h1 className="font-rubik">Re-Attempt</h1>
            </div>
          ) : (
            <div className="flex items-center gap-2" onClick={handleQuizClick}>
              <VscDebugStart />
              <h1 className="font-rubik">Start</h1>
            </div>
          )}
        </CardHeader>
        <CardBody className="h-[vh] flex flex-row justify-between ">
          {quizData && (
            <div className="flex flex-col">
              <p className="">{quizData.description}</p>
              <p>No. of Questions: {quizData.numQuestions}</p>
            </div>
          )}

          <div
            className={
              loc.pathname.includes("generated")
                ? "hidden"
                : "w-[40%] grid justify-items-end items-start"
            }
          >
            <CircularProgress
              label="Score"
              size="lg"
              value={quizData.score}
              color="success"
              showValueLabel={true}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default QuizCard;
