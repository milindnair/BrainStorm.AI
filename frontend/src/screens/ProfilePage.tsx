import { useState, useEffect } from "react"
import Title from "../components/Title"
import HeaderCard from "../components/HeaderCard"



function ProfilePage() {
    const [user, setUser] = useState("")
    useEffect(() => {
        const user = localStorage.getItem('name')
        if(user) {
            setUser(JSON.parse(user))
        }
    }, [])

    return (
        <div className="h-full flex flex-col justify-between">
            <div>
                <Title name={"Profile"}/>
            </div>

            <div className="mt-[25%]">
                <HeaderCard usrname={user}/>
            </div>

            
        </div>
    )
}

export default ProfilePage