import { useState, useEffect } from "react"
import Title from "../components/Title"
import HeaderCard from "../components/HeaderCard"
import Footer from "../modules/Footer"
import { Button } from "@nextui-org/react"
import FeedBack from "../modules/FeedBack"
import "../modules/Footer.css"
import { auth } from "../utils/Firebaseconfig"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

function ProfilePage() {
    const [user, setUser] = useState("")
    const [userPhoto, setUserPhoto] = useState("")

    const navigate = useNavigate()

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

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            console.log("User signed out");
            navigate("/login")
        })
        .catch((error:any) => {
            console.log("Error signing out: ", error)
        })
    }

    return (
        <div className="h-[100vh] flex flex-col">
            <div>
                <Title name={"Profile"}/>
            </div>

            <div className="mt-[25%]">
                <HeaderCard usrname={user} photoURL={userPhoto}/>
            </div>

            <div className="w-[90vw] mx-auto mt-[10%]">
                <Button color="danger" className="w-full" onClick={handleLogout}>
                    Logout
                </Button>
            </div> 

            <FeedBack />

            <Footer />
        </div>
    )
}

export default ProfilePage