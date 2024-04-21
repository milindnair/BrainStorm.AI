import { useState } from "react"

type Props = {
  onAnswer: (response: string) => void; // Define the prop type
}

function FIB(props:Props) {
  const [ inputAnswer, setInputAnswer ] = useState("")

  return (
    <div>
      <div className="border-b-2 border-black mt-5 text-xl">
      <input 
      type="text" 
      className="focus:outline-none" 
      value={inputAnswer} 
      onChange={(e) => {
        setInputAnswer(e.target.value)
        props.onAnswer(e.target.value)
        }}/>
      </div>
      <div>
      <p>Input Answer: {inputAnswer}</p>
      </div>
    </div>
  )
}

export default FIB