import { useEffect, useState } from "react";

type Props = {
  lhs:any
  rhs:any
  onAnswer: (responses: (number | null)[]) => void
}

function MTF(props: Props) {
  const [selectedOptions, setSelectedOptions] = useState(new Array(props.lhs.length).fill(null));

  const handleOptionSelect = (index, value) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = value;
    setSelectedOptions(updatedSelectedOptions);
    props.onAnswer(updatedSelectedOptions);
  };

  // useEffect(() => {
  //   console.log(selectedOptions)
  // }, [selectedOptions])


  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-md shadow-md">
      <div className="flex flex-wrap gap-4">
        {/* Render lhs options */}
        {props.lhs.map((lhsOption, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="font-semibold">{lhsOption}</span>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={selectedOptions[index]}
              onChange={(e) => handleOptionSelect(index, parseInt(e.target.value))}
            >
              <option>---</option>
              {/* Render rhs options */}
              {props.rhs.map((rhsOption, rhsIndex) => (
                <option key={rhsIndex} value={rhsIndex}>
                  {rhsOption}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

    </div>
  )
}

export default MTF