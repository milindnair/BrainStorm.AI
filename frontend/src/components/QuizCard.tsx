import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { CircularProgress } from '@nextui-org/react'
import { useLocation } from "react-router-dom";

type Props = {
    quiz: {
        title: String,
        score: number,
        category: String[]
    }
}

function QuizCard(props: Props) {
    const loc = useLocation()
  return (
    <div className="mt-5 w-[90%] mx-auto grid justify-items-center font-rubik">
        <Card>
            <CardHeader className="w-[90vw] flex flex-row">
                <div className="w-[55%]">
                    <h1 className="text-2xl">{props.quiz.title}</h1>
                </div>
            </CardHeader>
            <CardBody className="h-[vh] flex flex-row">
                <p className="">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Cupiditate minima labore ad quaerat totam harum
                </p>
                <div className={loc.pathname.includes("generated") ? "hidden" : "w-[40%] grid justify-items-center items-start"}>        
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
  )
}

export default QuizCard


