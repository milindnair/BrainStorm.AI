import { useEffect, useState } from 'react'
import './App.css'
import Footer from './modules/Footer'
import { useNavigate ,} from 'react-router-dom'
import HeaderCard from './components/HeaderCard'
import RecentQuiz from './components/RecentQuiz'
// import PdfTextExtractor from './components/PdfTextExtractor'
import BarChart from './modules/DataVisualization/BarChart'

function App() {
  const [user,setUser] = useState("");
  const [userPhoto, setUserPhoto] = useState("")
  const navigate = useNavigate();
  useEffect(() =>
  {
    const user = localStorage.getItem('name');
    const profilePic = localStorage.getItem('photoURL')
    if(user && profilePic)
    {
      setUser(JSON.parse(user));
      setUserPhoto(JSON.parse(profilePic))
    }
    else{
      navigate("/login");
    }
  }
  ,[])

  return (
    <div className='h-[100vh]'>
      <div className='pt-5'>
      <HeaderCard usrname={user} photoURL={userPhoto}/>
      </div>
      <div className='mt-10 ml-[5%]'>
        <RecentQuiz usrname={user}/>
      </div>
      <div>
        {/* <BarChart /> */}
      </div>
      {/* <PdfTextExtractor /> */}
     <Footer />
    </div>
  )
}

export default App
