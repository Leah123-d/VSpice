//To-Do: 
  //Set-up React Routing

import { useState } from 'react'
import './styles.css'
import CreateSpice  from './components/CreateSpice'

function App() {

  const [spiceAnalyze, setSpiceAnalyze] = useState(null);
  const [errorHandle, setErrorHandle] = useState(false);

  const createNewSpice = async (formData) => {
    //we will pass the function to the component and get the information that way 
    console.log("image submitted:", formData);

    try {
      await fetch("/vision", {
        method: "POST",
        body: formData,
      });
      const response = await fetch('/vision');
      const data = await response.json();
      setSpiceAnalyze(data);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("error fetching data: ", error);
      setErrorHandle(true);
    }
  };


  return (
    <div>
      <h1>Welcome to VSpice!</h1>
      <CreateSpice createNewSpice={createNewSpice}/>
    </div>
    
    
  )
}

export default App
