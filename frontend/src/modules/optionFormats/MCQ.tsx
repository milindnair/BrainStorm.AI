
import {Checkbox} from "@nextui-org/react";
import { useState } from "react";

type Props = {
  options: string[]
  onAnswer: (response: string) => void
}

function MCQ(props: Props) {
  const [selectedOption, setSelectedOption] = useState("");


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
              onChange={(e) => {
                setSelectedOption(e.target.value)
                props.onAnswer(e.target.value)
              }}
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