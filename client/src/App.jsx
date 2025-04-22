//To-Do:
//Set-up React Routing

import { useState } from "react";
import "./styles.css";
import CreateSpice from "./components/CreateSpice";
import ViewSpice from "./components/ViewSpice";

function App() {
  const [spiceAnalyze, setSpiceAnalyze] = useState(null);
  const [errorHandle, setErrorHandle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createNewSpice = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    //we will pass the function to the component and get the information that way
    console.log("image submitted:", formData);

    try {
      const res = await fetch("vision/image", {
        method: "POST",
        body: formData,
      });
      const uploadData = await res.json();
      setIsLoading(true);

      if (!uploadData.path) {
        console.error("upload did not return valid path");
      }

      const analyzeRes = await fetch("/vision/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath: uploadData.path }),
      });
      const analyzeData = await analyzeRes.json();
      console.log("analyze response:", analyzeData);
      setIsLoading(false);

      const createSpiceInDB = 
      console.log('inside create spice function', analyzeData);
      await fetch("/spices",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( analyzeData ),
      });
      const response = await fetch('/spices');
      const data = await response.json();
      console.log("create spice response", data);

    } catch (error) {
      console.error("error handling spice creation: ", error);
      setErrorHandle(true);
    }
  };

  return (
    <div>
      <h1>Welcome to VSpice!</h1>
      <CreateSpice createNewSpice={createNewSpice} />
      <ViewSpice spiceAnalyze={spiceAnalyze} isLoading={isLoading} />
    </div>
  );
}

export default App;
