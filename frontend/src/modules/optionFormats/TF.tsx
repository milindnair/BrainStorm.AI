import { useState } from 'react'

type Props = {
  onAnswer: (response: string) => void; // Define the prop type
}

function TF(props: Props) {
  const [ selectedOption, setSelectedOption ] = useState("")

  return (
    <div>
      <form className="flex flex-col text-xl">
        <label>
          <input
            type="radio"
            name="option"
            value="true"
            checked={selectedOption === 'true'}
            onChange={(e) => {
              setSelectedOption(e.target.value)
              props.onAnswer(e.target.value)
            }}
          />
          True
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="false"
            checked={selectedOption === 'false'}
            onChange={(e) => {
              setSelectedOption(e.target.value)
              props.onAnswer(e.target.value)
            }}
          />
          False
        </label>
      </form>
      <p>Selected option: {selectedOption}</p>
    </div>
  )
}

export default TF