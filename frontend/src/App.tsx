import { useEffect, useState } from 'react'
import './App.css'
import { Button } from '@nextui-org/react'
import Footer from './modules/Footer'
// import {Footer} from "./modules/Footer"
import Login from './screens/Login'
import { useNavigate ,} from 'react-router-dom'
import HeaderCard from './components/HeaderCard'
import RecentQuiz from './components/RecentQuiz'
import UploadPDF from './components/UploadPDF'
import PdfTextExtractor from './components/PdfTextExtractor'
function App() {
  const [user,setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() =>
  {
    const user = localStorage.getItem('name');
    console.log("")
    if(user)
    {
      setUser(JSON.parse(user));
      console.log(user);
    }
    else{
      navigate("/login");
    }
  }
  ,[])

  return (
    <div className='h-[100vh]'>
      <div className='pt-5'>
      <HeaderCard />
      </div>
      <div className='mt-10 ml-[5%]'>
        <RecentQuiz />
      </div>
      <div className='mt-10 ml-[5%]'>
        <UploadPDF />
      </div>
      {/* <PdfTextExtractor /> */}
    
     <Footer />
    </div>
  )
}

export default App
