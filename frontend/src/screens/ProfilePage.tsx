import { useState, useEffect } from "react"
import Title from "../components/Title"
import HeaderCard from "../components/HeaderCard"
import Footer from "../modules/Footer"
import { Button } from "@nextui-org/react"
import FeedBack from "../modules/FeedBack"

function ProfilePage() {
    const [user, setUser] = useState("")
    const [userPhoto, setUserPhoto] = useState("")
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

    return (
        <div className="h-[100vh] flex flex-col overflow-y-hidden">
            <div>
                <Title name={"Profile"}/>
            </div>

            <div className="mt-[25%]">
                <HeaderCard usrname={user} photoURL={userPhoto}/>
            </div>

            <div className="w-[90vw] mx-auto mt-[10%]">
                <Button color="danger" className="w-full">
                    Logout
                </Button>
            </div> 

            <FeedBack />

            <Footer />
        </div>
    )
}

export default ProfilePage