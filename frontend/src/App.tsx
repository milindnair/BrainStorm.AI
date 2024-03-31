import { useEffect, useState } from 'react'
import './App.css'
import Footer from './modules/Footer'
import { useNavigate ,} from 'react-router-dom'
import HeaderCard from './components/HeaderCard'
import RecentQuiz from './components/RecentQuiz'
// import PdfTextExtractor from './components/PdfTextExtractor'

function App() {
  const [user,setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() =>
  {
    const user = localStorage.getItem('name');
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
      <HeaderCard usrname={user} />
      </div>
      <div className='mt-10 ml-[5%]'>
        <RecentQuiz usrname={user}/>
      </div>
      {/* <PdfTextExtractor /> */}
     <Footer />
    </div>
  )
}

export default App
