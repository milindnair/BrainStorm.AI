import { useState, useEffect } from "react"
import Title from "../components/Title"
import HeaderCard from "../components/HeaderCard"
import Footer from "../modules/Footer"
import { Link, useLocation } from "react-router-dom"
import QuizCard from "../components/QuizCard"

function ProfilePage() {
    const loc = useLocation()
    const [user, setUser] = useState("")
    const [userPhoto, setUserPhoto] = useState("")
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
    }, [])

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
        <div className="h-[100vh] flex flex-col">
            <div>
                <Title name={"Profile"}/>
            </div>

            <div className="mt-[25%]">
                <HeaderCard usrname={user} photoURL={userPhoto}/>
            </div>

            <Footer />
        </div>
    )
}

export default ProfilePage