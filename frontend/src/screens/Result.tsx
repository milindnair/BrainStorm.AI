import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { ArrowLeft } from "iconsax-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Result = () => {
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.state);
  }, [location]);

  const handleExplanation = (question,index) => {
   
    console.log(question);
    navigate(`${url}/explanation`, { state: { question,userAnswers:location.state.userAnswers,index:index,correctAnswers:location.state.correctAnswers,actualAnswers:location.state.actualAnswers } });
  }


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
              Result
            </h1>
          </div>
        </CardHeader>

        <CardBody className="flex flex-col items-center justify-center h-auto overflow-y-auto mt-10 mb-3 pt-40 ">
          {location.state.questions.map((item, index) => (
            <Accordion defaultExpandedKeys={["2"]} key={index} >
            
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                subtitle="Press to expand"
                title={`Question ${index + 1}`}
                className={`${location.state.correctAnswerIndexes[index] === 1 ? 'bg-green-200' : 'bg-red-400'} `}
              >
                { item.type === "MCQ" ? (
                    <>
                  <h2>{item.question}</h2>
                  <Button color="primary" onClick={()=>handleExplanation(item,index)}>View Explanation</Button>
                  </>
                ) : item.type === "TrueFalse" || item.type === "FITB" ? (
                    <>
                  <h2>{item.sentence}</h2>
                  <Button color="primary" onClick={()=>handleExplanation(item,index)}>View Explanation</Button>
                  </>
                ) : null}
              </AccordionItem>

              
            </Accordion>
          ))}
        </CardBody>
        <h1 className="text-2xl">Score: {location.state.score}</h1>
      </Card>
    </div>
  );
};

export default Result;
