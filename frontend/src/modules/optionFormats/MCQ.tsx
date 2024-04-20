
import {Checkbox} from "@nextui-org/react";
import { useState } from "react";

type Props = {
  options: string[]
}

function MCQ(props: Props) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <form className="flex flex-col text-xl">
        {props.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </form>
      <p>Selected option: {selectedOption}</p>
    </div>
  )
}

export default MCQ