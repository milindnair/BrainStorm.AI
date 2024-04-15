import { useEffect, useState } from 'react'
import './App.css'
import Footer from './modules/Footer'
import { useNavigate ,} from 'react-router-dom'
import HeaderCard from './components/HeaderCard'
import RecentQuiz from './components/RecentQuiz'

import { Tabs, Tab, Card, CardBody} from "@nextui-org/react";

import Title from "./components/Title"
import { Link, useLocation } from "react-router-dom"
import QuizCard from "./components/QuizCard"

import { getDocs, query, collection } from 'firebase/firestore'
import { db } from './utils/Firebaseconfig'

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


  const loc = useLocation()
    const navClass = "w-1/2 text-center ";
    useEffect(() => {
        const user = localStorage.getItem('name');
        const profilePic = localStorage.getItem('photoURL')
        if(user && profilePic)
        {
          setUser(JSON.parse(user));
          setUserPhoto(JSON.parse(profilePic))
          console.log(user, userPhoto)
        }
        getQuestions()
    }, [])

    const getQuestions = async () => {
      const q = query(collection(db, "quizzes"))
      const querySnapshot = await getDocs(q);
      console.log("All Quizzes:")
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      });
    }


    const attemptedQuizzes = [
        {
            title: "ABC",
            score: 90,
            category: ["Fill in the blanks"]
        },
        {
            title: "EFG",
            score: 70,
            category: ["Fill in the blanks", "Multiple Choice Questions"]
        },
        {
          title: "HIJ",
          score: 60,
          category: ["Fill in the blanks"]
      },
      {
          title: "KLM",
          score: 70,
          category: ["Fill in the blanks", "Multiple Choice Questions"]
      }
    ]

    const generatedQuizzes = [
        {
            title: "GEN1",
            score: 0,
            category: ["Fill in the blanks"]
        },
        {
            title: "GEN2",
            score: 0,
            category: ["Fill in the blanks", "Multiple Choice Questions"]
        }
    ]

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
      <div className="w-[90%] mx-auto flex flex-col">
            <Tabs 
              aria-label='Options'
              classNames={{
                tabList: "w-full mt-4"
              }}
            >
              <Tab key='attempted' title='Attempted'>
                <Card className='overflow-auto max-h-[52vh]'>
                  {
                    attemptedQuizzes.map((quiz, index) => {
                      return(
                          <QuizCard quiz={quiz}/>
                      )
                  })
                  }
                </Card>
              </Tab>

              <Tab key='generated' title='Generated'>
                <Card>
                {
                  generatedQuizzes.map((quiz) => {
                  return <QuizCard quiz={quiz}/>
                  })
                }
                </Card>
              </Tab>

            </Tabs>
            <Footer />
        </div>
     <Footer />
    </div>
  )
}

export default App