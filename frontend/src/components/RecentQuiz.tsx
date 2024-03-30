import { CircularProgress } from '@nextui-org/react'
import React from 'react'
import './RecentQuiz.css'

type Props = {
  usrname: String
}

const RecentQuiz = (props: Props) => {
  return (
    <div className="w-[90%] flex justify-around   items-center">
      <div className="glassmorphism">
        <div className="flex flex-col w-[80%] ml-2">
          <div className="font-medium font-rubik text-[#c07985]">RECENT QUIZ</div>
          <div>
            <h1 className="font-medium text-2xl font-rubik text-[#6f0c1d]">{props.usrname}</h1>
          </div>
        </div>
        <div className="w-[20%] mt-2">        
          <CircularProgress
            label="Score"
            size="lg"
            value={70}
            color="success"
            showValueLabel={true}
          />
        </div>
      </div>
    </div>
  )
}

export default RecentQuiz
