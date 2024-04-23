import { Button, Input, Typography } from "@material-tailwind/react";
import { Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Footer from "../modules/Footer";
import Title from "../components/Title";
import { ArrowLeft } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@nextui-org/react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [matchingQuizzes, setMatchingQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Access the quizzes array from localStorage
    const quizzesString = localStorage.getItem("quizzes");
    const quizzesArray = JSON.parse(quizzesString);

    if (quizzesArray) {
      console.log("Quizzes array:", quizzesArray);
      // Filter the quizzes array to find matching quizzes
      const matches = quizzesArray.filter((quiz) =>
        quiz.id.toLowerCase().includes(search.toLowerCase())
      );

      // Log the matching quizzes
      console.log("Matching quizzes:", matches);

      // Update the state with matching quizzes
      setMatchingQuizzes(matches);
    }
  }, [search]);

  const onChange = ({ target }) => setSearch(target.value);

  return (
    <div className="h-[100vh] flex flex-col ">
      <div className="flex flex-row items-center w-full mt-5 ">
        <ArrowLeft
          size={32}
          color="#ffff"
          className="w-[10%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-rubik text-center text-white w-[68%]">
          Search
        </h1>
      </div>
      <div className="relative mt-5 p-3">
        <div className="flex">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={onChange}
            className="pr-20 bg-[#e1e0b5] text-gray-800 placeholder-gray-500"
            aria-placeholder="Search..."
            containerProps={{
              className: "min-w-0",
            }}
            labelProps={{
              className: "hidden",
            }}
          />

          <Button
            size="sm"
            color={search ? "gray" : "blue-gray"}
            disabled={!search}
            className="!absolute right-1 top-1 rounded m-3"
          >
            Search
          </Button>
        </div>

        {search ? (
          <Card className=" space-y-5 p-4 mt-3" radius="lg">
            {matchingQuizzes.length > 0 ? (
              matchingQuizzes.map((quiz, index) => (
                <div key={index}>
                  {" "}
                  {/* Added key for list items */}
                  <div>{quiz.id}</div>{" "}
                  {/* Access the id property of the quiz object */}
                  <Skeleton className="rounded-lg mb-2">
                    <div className="h-24 rounded-lg bg-default-300 "></div>
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </div>
                </div>
              ))
            ) : (
              <Typography color="gray">No matching quizzes found.</Typography>
            )}
          </Card>
        ) : (
          <Card className="p-4 mt-3" radius="lg">
            <Title id="skeleton-title" className="mb-4">
              <Skeleton />
            </Title>
            <Typography color="gray">Please search for quizzes.</Typography>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Search;
