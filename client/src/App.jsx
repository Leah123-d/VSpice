import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";
import CreateSpice from "./components/CreateSpice";
import ViewSpice from "./components/ViewSpice";
import NavBar from "./components/NavBar";
import SpiceCabinet from "./components/SpiceCabinet";
import ShoppingList from "./components/ShoppingList";
import ErrorHandle from "./components/ErrorHandle";

function App() {
  const [spiceAnalyze, setSpiceAnalyze] = useState(null);
  const [errorHandle, setErrorHandle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storedSpices, setStoredSpices] = useState(null);
  const [viewSpice, setViewSpice] =  useState(null);

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
      const createSpiceInDB = console.log(
        "inside create spice function",
        analyzeData
      );
      await fetch("/spices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(analyzeData),
      });
      const response = await fetch("/spices");
      const data = await response.json();
      console.log("create spice response", data);
    } catch (error) {
      console.error("error handling spice creation: ", error);
      setErrorHandle(true);
    }
  };
  const getSpices = async (id) => {
    try {
      const url = id ? `/spices/${id}` : "/spices";
      const res = await fetch(url);

      if (!res.ok) throw new Error("Failed to fetch spices");

      const data = await res.json();
      console.log("fetched spices: ", data);
      if(id){
        setViewSpice(data);
        return data;
      }else{
        setStoredSpices(data);
      }
    } catch (error) {
      console.error("Error fetchig posts: ", error);
      setErrorHandle(true);
      return [];
    }
  };
  useEffect(() => {
    getSpices();
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<SpiceCabinet storedSpices={storedSpices} getSpices={getSpices}/>} />
        <Route
          path="view"
          element={<ViewSpice viewSpice={viewSpice}/>}

        />
        <Route
          path="create"
          element={<CreateSpice createNewSpice={createNewSpice} />}
        />
        <Route path="shopping" element={<ShoppingList />} />
        <Route path="*" element={<ErrorHandle />} />
      </Routes>
    </div>
  );
}

export default App;
