import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuestionnaireComponent from './QuestionList'

function App() {
 const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extract the userId from the query parameters
    const params = new URLSearchParams(window.location.search);
    const id = params.get('no');
    window.localStorage.setItem("no",id)
    setUserId(id);
  }, []);
  return (
    <>
      <QuestionnaireComponent />
    
   </>
  )
}

export default App
