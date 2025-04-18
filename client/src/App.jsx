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
      const res = await fetch("/vision", {
        method: "POST",
        body: formData,
      });

    const text = await res.text();
    try{
      const json = JSON.parse(text);
      console.log("success:", json);
    }
      // setSpiceAnalyze(data);
    catch(error){
      console.error("count not parse response", error, text);
    }
    }
    
    catch (error) {
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
