import { ArrowLeft, ArrowLeft2 } from 'iconsax-react'
import {useNavigate} from 'react-router-dom'

type Props = {
    name:String,
}

const Title = (props: Props) => {
    const navigate = useNavigate();
    

  return (
    <div className='flex flex-row items-center fixed pt-5 pl-5 w-full'>
        <ArrowLeft variant='Outline' size={32} color='#FFFEFC' className="w-[10%]" onClick={()=>navigate(-1)} />
        <h1 className="text-3xl font-rubik text-center font-medium text-white w-[100%]">{props.name}</h1>
    </div>
  )
}

export default Title