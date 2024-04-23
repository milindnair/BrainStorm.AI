import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CircularProgress,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { ArrowLeft } from "iconsax-react";
import { useEffect, useState } from "react";

function QuizDetails() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [status,setStatus] = useState('');
  const [quizId,setQuizId] = useState('');
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    categories: [], // Initialize categories as an empty array
    score: 0,
    // Add other properties as needed
  });
  // Otherwise call getDocs and query for quiz with q_id = qid (param)
  // const quiz = {
  //     title: "ABC",
  //     score: 75,
  //     category: ["Fill in the blanks"],
  //     numQuestions: 10,
  //     quizDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sint repellat quam dolor enim qui",
  //     q_id: "1"
  // }

  const handleSubmit = () => {
    navigate(`/quiz/${quiz.title}`,{ state: { quiz: quiz,id:quizId }});
  };

  useEffect(() => {
    const quizId = location.pathname.split("/")[2];
    console.log(quizId);
    setQuizId(quizId);
    
    // fetch quiz details from the local storage
    const quizData = localStorage.getItem(quizId);
    setQuiz(JSON.parse(quizData));
    let quizzes = localStorage.getItem("quizzes");
    quizzes = JSON.parse(quizzes);
    quizzes = quizzes.map((quiz) => {
      if (quiz.id === quizId) {
        setStatus(quiz.status);
      }
    });
    
    
  }, []);

  console.log(quiz);
  return (
    <div className="h-full flex flex-col justify-between">
      <Card className="h-[95vh] w-[90vw] mt-5 mx-auto">
        <CardHeader className="">
          <div className="flex flex-row items-center fixed w-full mt-10">
            <ArrowLeft
              size={32}
              color="#000000"
              className="w-[10%]"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-3xl font-rubik text-center text-black w-[68%]">
              {quiz.title}
            </h1>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mt-10 grid justify-items-center h-[70vh]">
            <p className="text-xl">{quiz.description}</p>
            <p>Types of Questions: </p>
            <div>
              {quiz &&
                Array.isArray(quiz.categories) &&
                quiz.categories.map((category, index) => {
                  return (
                  
                    
                    <div
                      key={index}
                      className="bg-[#4836BE] text-white rounded-lg p-2 m-2"
                    >
                        
                      {category}
                    </div>
                
                  );
                })}
            </div>
            <CircularProgress
              label="Score"
              size="lg"
              value={quiz.score}
              color="success"
              showValueLabel={true}
              classNames={{
                svg: "w-48 h-48 items-center",
                value: "text-lg",
              }}
            />
            <div>
                {
                    status === "attempted" ? (
                        <div className="flex items-center gap-2" >
                           
                            <h1 className="font-rubik">Dont Worry we keep your Latest Score</h1>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2" >
                            
                            <h1 className="font-rubik">Attempt the quiz once to get the score</h1>
                        </div>
                    )
                }
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div className="mt-5 grid w-full">
            <Button
              className="font-rubik bg-[#4836BE] text-white text-lg w-full justify-self-center"
              onClick={handleSubmit}
            >
              Attempt Quiz
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default QuizDetails;
