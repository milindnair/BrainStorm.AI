import { useEffect, useState } from "react";
import Title from "../components/Title";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../utils/Firebaseconfig";
import { useSnackbar } from "notistack";
import UploadPDF from "../components/UploadPDF";
import { Spinner } from "@nextui-org/react";
import Loader from "./Loader";

const mcqEndpoint = import.meta.env.VITE_MCQ_ENDPOINT;
const trueOrFalseEndpoint = import.meta.env.VITE_TRUEORFALSE_ENDPOINT;
const fillInTheBlankEndpoint = import.meta.env.VITE_FILLINTHEBLANK_ENDPOINT;
const matchTheFollowingEndpoint = import.meta.env
  .VITE_MATCHTHEFOLLOWING_ENDPOINT;

const CreateQuiz = () => {
  const { state } = useLocation();
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [description, setDescription] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [categoryDisplayText, setCategoryDisplayText] =
    useState("Select Category");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [Finalquestions, setFinalQuestions] = useState({});

  const categories = [
    "Multiple Choice Questions",
    "True or False",
    "Fill in the blanks",
    // "Match the following",
  ];

  const toggleShowCategories = () => {
    setShowCategories(!showCategories);
    if (selectedCategories.length > 0) {
      setCategoryDisplayText(selectedCategories.join(", "));
    } else {
      setCategoryDisplayText("Select Category");
    }
  };

  const handleCategoryChange = (category) => {
    const currentIndex = selectedCategories.indexOf(category);
    const newSelectedCategories = [...selectedCategories];

    if (currentIndex === -1) {
      newSelectedCategories.push(category);
    } else {
      newSelectedCategories.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelectedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let quizData = {
        title,
        numQuestions,
        description,
        categories: selectedCategories,
        extractedText: text,
      };
      console.log(quizData);

      const [response1, response2, response3] = await Promise.all([
        axios
          .post(mcqEndpoint, {
            summarized_text: summary,
            unsummarized_text: text,
          })
          .catch((error) => console.error("Error in MCQ request:", error)),
        axios
          .post(fillInTheBlankEndpoint, { summarized_text: summary })
          .catch((error) =>
            console.error("Error in Fill in the Blank request:", error)
          ),
        axios
          .post(trueOrFalseEndpoint, { text: summary })
          .catch((error) =>
            console.error("Error in True or False request:", error)
          ),
        // axios
        //   .post(matchTheFollowingEndpoint, { text: summary })
        //   .catch((error) =>
        //     console.error("Error in Match the Following request:", error)
        //   ),
      ]);

      console.log("Response 1:", response1.data);
      console.log("Response 2:", response2.data);
      console.log("Response 3:", response3.data);
      // console.log("Response 4:", response4.data);

      let mcqquestions = response1.data;
      let fitbquestions = response2.data;
      let truefalsequestions = response3.data;
      // let matchthefollowingquestions = response4.data;

      quizData = {
        ...quizData,
        mcq: mcqquestions,
        fitb: fitbquestions,
        truefalse: truefalsequestions,
        // matchthefollowing: matchthefollowingquestions,
        score: 0,
      };

      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

      const customDocId = `${title.replace(/\s+/g, "_")}_${formattedDate}`;

      const docRef = doc(db, "quizzes", customDocId);
      await setDoc(docRef, quizData);

      console.log("Document written with ID: ", docRef.id);

      let userId = localStorage.getItem("uid");

      if (!userId) {
        throw new Error("User ID not found in local storage");
      }
      userId = userId.replace(/"/g, "");

      const userDocRef = doc(db, "users", userId);

      const newQuiz = {
        id: customDocId,
        status: "generated",
      };

      await setDoc(
        userDocRef,
        { quizzes: arrayUnion(newQuiz) },
        { merge: true }
      );
      console.log("User document updated with new quiz");
      //add the quiz to the quizzes
      let quizzesString = localStorage.getItem("quizzes");
      let quizzesArray = quizzesString ? JSON.parse(quizzesString) : [];

      // Append the new quiz to the array
      quizzesArray.push(newQuiz);

      // Convert the updated array back into a string and store it in localStorage
      localStorage.setItem("quizzes", JSON.stringify(quizzesArray));

      enqueueSnackbar("Quiz added Successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  useEffect(() => {
    console.log(Finalquestions);
  }, [Finalquestions]);

  useEffect(() => {
    if (summary) {
      enqueueSnackbar("Summary retrieved successfully!", {
        variant: "success",
      });
      setShowSnackbar(true);
    }
  }, [summary, enqueueSnackbar]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="">
          <Title name={"Create Quiz"} />
        </div>

        <div className="max-h-[75vh] mt-24 m-4 p-4 rounded-2xl bg-white flex flex-col gap-5 overflow-auto">
          <div className="flex flex-col justify-center w-full p-2">
            <h2 className="text-2xl font-semibold mb-2 font-rubik">Title</h2>
            <Input
              type="text"
              placeholder="Enter Quiz Title"
              className="!border placeholder:font-rubik font-Monterrat text-uppercase !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden ",
              }}
              size="lg"
              containerProps={{
                className:
                  "min-w-[100px] min-h-[50px] font-Monterrat text-uppercase",
              }}
              crossOrigin={undefined}
              style={{
                borderRadius: "12px",
                textTransform: "uppercase",
                transform: "uppercase",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center w-full p-2">
            <h2 className="text-2xl font-semibold mb-2 font-rubik">
              Number Of Questions
            </h2>
            <Input
              type="number"
              placeholder="Enter Number Of Questions"
              className="!border placeholder:font-rubik font-Monterrat text-uppercase !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{
                className: "min-w-[100px] min-h-[50px] font-Monterrat",
              }}
              crossOrigin={undefined}
              style={{
                borderRadius: "12px",
                textTransform: "uppercase",
                transform: "uppercase",
              }}
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center w-full p-2">
            <h2 className="text-2xl font-semibold mb-2 font-rubik">
              Quiz Category
            </h2>
            <div className="relative">
              <div
                className="flex items-center justify-between px-4 py-2 rounded border border-gray-300 cursor-pointer min-h-[50px] font-rubik"
                onClick={toggleShowCategories}
                style={{
                  borderRadius: "12px",
                  textTransform: "uppercase",
                  transform: "uppercase",
                }}
              >
                <span>{categoryDisplayText}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {showCategories && (
                <div className="absolute top-full left-0 w-full mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg font-rubik">
                  {categories.map((category) => (
                    <div key={category} className="mb-2">
                      {" "}
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        label={category}
                        style={{ borderRadius: "12px" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center w-full p-2">
            <h2 className="text-2xl font-semibold mb-2 font-rubik">
              Description
            </h2>
            <textarea
              placeholder="Enter Description"
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 placeholder:font-rubik text-uppercase"
              style={{ borderRadius: "12px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="border-black border-dotted border-2 -mt-3 ">
            <UploadPDF
              setText={setText}
              setSummary={setSummary}
              onLoadingStart={() => setIsLoading(true)}
              onLoadingEnd={() => {
                setIsLoading(false);
                setShowSnackbar(true);
              }}
            />
          </div>
        </div>
        <div className="mt-5 grid">
          <Button
            className="font-rubik bg-[#4836BE] text-lg w-[90%] justify-self-center"
            placeholder={undefined}
            onClick={handleSubmit}
          >
            Add Quiz
          </Button>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          {/* <Spinner
            label="Loading..."
            color="warning"
            className="text-red-400"
          /> */}
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
