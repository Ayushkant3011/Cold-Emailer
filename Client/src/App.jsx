import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(res => console.log(res.data));
  }, []);


  return (
    <>
      <h1>Cold Email Automation app</h1>
    </>
  )
}

export default App
