 import { useState, useEffect } from "react"
import Title from "../components/Title"
import HeaderCard from "../components/HeaderCard"
import Footer from "../modules/Footer"
import { Link, useLocation } from "react-router-dom"


function ProfilePage() {
    const loc = useLocation()
    const [user, setUser] = useState("")
    const navClass = "w-1/2 text-center";
    useEffect(() => {
        const user = localStorage.getItem('name')
        if(user) {
            setUser(JSON.parse(user))
        }
    }, [])


    return (
        <div className="h-[100vh] flex flex-col">
            <div>
                <Title name={"Profile"}/>
            </div>

            <div className="mt-[25%]">
                <HeaderCard usrname={user}/>
            </div>

            <div className="flex flex-row w-[80%] mx-auto border-2 border-white rounded-lg mt-5">
                <Link to={'/profile-attempted'} className={`${navClass} ${loc.pathname.includes('attempted') ? 'text-black bg-white' : 'text-white'}`}>Attempted</Link>
                <Link to={'/profile-generated'} className={`${navClass} ${loc.pathname.includes('generated') ? 'text-black bg-white' : 'text-white'}`}>Generated</Link>
            </div>

            

            <Footer />
        </div>
    )
}

export default ProfilePage