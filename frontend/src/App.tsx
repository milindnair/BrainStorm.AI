import { useEffect, useState } from 'react'
import './App.css'
import { Button } from '@nextui-org/react'
import Footer from './modules/Footer'
// import {Footer} from "./modules/Footer"
import Login from './screens/Login'
import { useNavigate ,use} from 'react-router-dom'

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
    <>
     <h2 className='z-1 font-bold text-7xl'>{user}</h2>

    </>
  )
}

export default App
