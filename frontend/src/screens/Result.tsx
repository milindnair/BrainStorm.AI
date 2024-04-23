import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { ArrowLeft } from "iconsax-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/Firebaseconfig";
import { update } from "firebase/database";
import { FieldValue } from "firebase/firestore";

const Result = () => {
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();

  const updateUserQuizStatus = async (uid, id) => {
    const userDocRef = doc(db, "users", uid);

    // Fetch the current document
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      // Get the quizzes array
      const quizzes = docSnapshot.data().quizzes;

      // Find the quiz with the matching id and status "generated"
      const quizToUpdate = quizzes.find(
        (quiz) => quiz.id === id && quiz.status === "generated"
      );

      if (quizToUpdate) {
        // Remove the old quiz object
        await updateDoc(userDocRef, {
          quizzes: arrayRemove({
            id: id,
            status: "generated",
          }),
        });

        // Add the updated quiz object
        await updateDoc(userDocRef, {
          quizzes: arrayUnion({
            id: id,
            status: "attempted",
          }),
        });
      } else {
        console.log("Quiz not found with status 'generated'");
        // Handle the case where the quiz is not found with the status 'generated'
      }
    } else {
      console.log("User document does not exist");
      // Handle the case where the user document does not exist
    }
  };

  // Inside your useEffect or wherever you're performing the update
  const updateQuizScore = async (quizId, newScore) => {
    const quizDocRef = doc(db, "quizzes", quizId);

    // Fetch the current document
    const docSnapshot = await getDoc(quizDocRef);

    if (docSnapshot.exists()) {
      // Get the current score
      const currentScore = docSnapshot.data().score;

      // Check if the new score is greater than the current score
      if (newScore > currentScore) {
        // Update the score if the new score is greater
        await updateDoc(quizDocRef, { score: newScore });
      }
    } else {
      console.log("Document does not exist");
      // Handle the case where the document does not exist
    }
  };

  useEffect(() => {
    console.log(location.state);
    const uid = (localStorage.getItem("uid") as string)?.replace(/"/g, "");

    // Update the user's quiz status
    updateUserQuizStatus(uid, location.state.id);

    // Update the quiz's score
    updateQuizScore(location.state.id, location.state.score);

    console.log("Updates completed successfully!");
  }, [location]);

  const handleExplanation = (question, index) => {
    console.log(question);
    navigate(`${url}/explanation`, {
      state: {
        question,
        userAnswers: location.state.userAnswers,
        index: index,
        correctAnswers: location.state.correctAnswers,
        actualAnswers: location.state.actualAnswers,
      },
    });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <Card className="h-[95vh] w-[90vw] mt-5 mx-auto">
        <CardHeader className="">
          <div className="flex flex-row items-center fixed w-full mt-10">
            <ArrowLeft
              size={32}
              color="#000000"
              className="w-[10%]"
              onClick={() => navigate("/")}
            />
            <h1 className="text-3xl font-rubik text-center text-black w-[68%]">
              Result
            </h1>
          </div>
        </CardHeader>

        <CardBody className="flex flex-col items-center justify-center h-auto overflow-y-auto mt-10 mb-3 pt-40 ">
          {location.state.questions.map((item, index) => (
            <Accordion defaultExpandedKeys={["2"]} key={index}>
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                subtitle="Press to expand"
                title={`Question ${index + 1}`}
                className={`${
                  location.state.correctAnswerIndexes[index] === 1
                    ? "bg-green-200"
                    : "bg-red-400"
                } `}
              >
                {item.type === "MCQ" ? (
                  <>
                    <h2>{item.question}</h2>
                    <Button
                      color="primary"
                      onClick={() => handleExplanation(item, index)}
                    >
                      View Explanation
                    </Button>
                  </>
                ) : item.type === "TrueFalse" || item.type === "FITB" ? (
                  <>
                    <h2>{item.sentence}</h2>
                    <Button
                      color="primary"
                      onClick={() => handleExplanation(item, index)}
                    >
                      View Explanation
                    </Button>
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
