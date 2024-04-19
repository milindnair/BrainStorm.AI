import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { CircularProgress } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

type Props = {
  quiz: {
    title: String;
    score: number;
    category: String[];
    status: String;
    q_id: String
  };
};

function QuizCard(props: Props) {
  const loc = useLocation();
  const navigation = useNavigate();

  const handleQuizClick = () => {
    console.log("handleQuizClick");
    navigation(`/quizDetails/${props.quiz.q_id}`);
};

  return (
    <div className="mt-5 w-[90%] mx-auto grid justify-items-center font-rubik " >
      <Card
        className={
          props.quiz.status == "Attempted" ? "bg-[#9ff5d8]" : "bg-[#fff9db]"
        }
         style={{ cursor: "pointer" }}
      >
        <CardHeader className="w-[90vw] flex flex-row justify-between">
          <div className="w-[55%]">
            <h1 className="text-2xl">{props.quiz.title}</h1>
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
          {/* <div className="flex items-center gap-2">
                    <IoReload />
                    <h1 className="font-rubik">Re-Attempt</h1>
                </div> */}
        </CardHeader>
        <CardBody className="h-[vh] flex flex-row">
          <p className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
            minima labore ad quaerat totam harum
          </p>
          <div
            className={
              loc.pathname.includes("generated")
                ? "hidden"
                : "w-[40%] grid justify-items-center items-start"
            }
          >
            <CircularProgress
              label="Score"
              size="lg"
              value={props.quiz.score}
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
