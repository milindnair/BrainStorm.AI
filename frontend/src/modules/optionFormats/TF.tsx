import { useState } from 'react'

function TF() {
  const [ selectedOption, setSelectedOption ] = useState("")

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <form className="flex flex-col text-xl">
        <label>
          <input
            type="radio"
            name="option"
            value="true"
            checked={selectedOption === 'true'}
            onChange={handleOptionChange}
          />
          True
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="false"
            checked={selectedOption === 'false'}
            onChange={handleOptionChange}
          />
          False
        </label>
      </form>
      <p>Selected option: {selectedOption}</p>
    </div>
  )
}

export default TF