import { useState } from 'react'
import './styles.css'
import CreateSpice  from './components/CreateSpice'

function App() {
  const [spiceImage, setSpiceImage] = useState(null);

  const createSpice = async (formData) => {
    //we will pass the function to the component and get the information that way 
    console.log("image submitted:", formData);

    try {
      await fetch("/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await fetch('/vision');
      const data = await response.json();
      setSpiceImage(data);
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
      <CreateSpice />
    </div>
    
    
  )
}

export default App
