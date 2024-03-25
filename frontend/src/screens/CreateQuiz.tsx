import { useState } from "react";
import Footer from "../modules/Footer";
import Title from "../components/Title";
import { Button, Checkbox, Input } from "@material-tailwind/react";

const CreateQuiz = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

  const toggleShowCategories = () => {
    setShowCategories(!showCategories);
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

  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <div className="pt-[25px]">
          <Title name={"Create Quiz"} />
        </div>

        <div className="h-[75vh] mt-10 m-4 p-4 rounded-2xl bg-white flex flex-col gap-5">
          <div className="flex flex-col justify-center w-full p-2">
            <h2 className="text-2xl font-semibold mb-2 font-rubik">Title</h2>
            <Input
              type="email"
              placeholder="Enter Quiz Title"
              className="!border placeholder:font-rubik font-Monterrat text-uppercase !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden ",
              }}
              size="lg"
              containerProps={{ className: "min-w-[100px] min-h-[50px] font-Monterrat text-uppercase" }}
              crossOrigin={undefined}
              style={{ borderRadius: "12px",textTransform: "uppercase",transform: "uppercase"}}
            />
          </div>
          <div className="flex flex-col justify-center w-full p-2">
            <h2 className="text-2xl font-semibold mb-2 font-rubik">Number Of Questions</h2>
            <Input
              type="number"
              placeholder="Enter Number Of Questions"
              className="!border placeholder:font-rubik font-Monterrat text-uppercase !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px] min-h-[50px] font-Monterrat" }}
              crossOrigin={undefined}
              style={{ borderRadius: "12px",textTransform: "uppercase",transform: "uppercase" }}
            />
          </div>
          <div className="flex flex-col justify-center w-full p-2">
            <h2 className="text-2xl font-semibold mb-2 font-rubik">Quiz Category</h2>
            <div className="relative">
              <div
                className="flex items-center justify-between px-4 py-2 rounded border border-gray-300 cursor-pointer min-h-[50px] font-rubik"
                onClick={toggleShowCategories}
                style={{ borderRadius: "12px",textTransform: "uppercase",transform: "uppercase" }}
              >
                <span>Select Category</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {showCategories && (
                <div className="absolute top-full left-0 w-full mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg font-rubik">
                  {categories.map((category) => (
                    <Checkbox
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      label={category}
                      style={{ borderRadius: "12px" }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center w-full p-2">
            <h2 className="text-2xl font-semibold mb-2 font-rubik">Description</h2>
            <textarea
              placeholder="Enter Description"
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 placeholder:font-rubik text-uppercase"
              rows={4}
              style={{ borderRadius: "12px" }}
            ></textarea>
          </div>
          <div className="p-2">
            <Button className="font-rubik bg-[#6a5ae0] text-lg w-full" children={undefined} placeholder={undefined}>
              Add Quiz
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateQuiz;
