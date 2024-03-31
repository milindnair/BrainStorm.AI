import { ArrowLeft, ArrowLeft2 } from 'iconsax-react'
import React from 'react'
import {useNavigate} from 'react-router-dom'

type Props = {
    name:String,
}

const Title = (props: Props) => {
    const navigate = useNavigate();
    

  return (
    <div className='flex flex-row items-center fixed p-6 w-full'>
        <ArrowLeft size={32} color='#FFFEFC' className="" onClick={()=>navigate(-1)} />
        <h1 className="text-3xl font-rubik text-center text-white ml-[25%]">{props.name}</h1>
    </div>
  )
}

export default Title