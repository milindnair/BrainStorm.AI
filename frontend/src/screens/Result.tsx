import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Result = () => {
    const location  = useLocation();

    useEffect(() => {
        console.log(location.state)
    }, [location])

  return (
    <div>Result</div>
  )
}

export default Result