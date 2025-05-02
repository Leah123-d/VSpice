import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./styles.css";
import CreateSpice from "./components/CreateSpice";
import ViewSpice from "./components/ViewSpice";
import NavBar from "./components/NavBar";
import SpiceCabinet from "./components/SpiceCabinet";
import ShoppingList from "./components/ShoppingList";
import EditSpice from "./components/EditSpice";
import ErrorHandle from "./components/ErrorHandle";

function App() {
  const [errorHandle, setErrorHandle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [storedSpices, setStoredSpices] = useState(null);
  const [viewSpice, setViewSpice] =  useState(null);
  const [viewSpice, setViewSpice] = useState(null);
  const [newSpiceId, setNewSpiceId] = useState(null);
  const navigate = useNavigate();

  const handleEditSpice = (id) => {
    console.log(id);
    getSpices(id);
  };
  const createNewSpice = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("vision/image", {
        method: "POST",
        body: formData,
      });
      const uploadData = await res.json();
      setIsLoading(true);
      setIsAnalyzing(true);
      const analyzeRes = await fetch("/vision/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: uploadData.filename }),
      });
      const analyzeData = await analyzeRes.json();
      console.log("analyze response:", analyzeData);
      const postAnalyze = await fetch("/spices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(analyzeData),
      });
      const newSpice = await postAnalyze.json();
      console.log("new spice response", newSpice.id);
      setNewSpiceId(newSpice.id);
      setIsLoading(false);
      setIsAnalyzing(false);
      getSpices();
    } catch (error) {
      console.error("error handling spice creation: ", error);
      setErrorHandle(true);
      navigate("/error");
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
      if (id) {
        setViewSpice(data);
        return data;
      } else {
        setStoredSpices(data);
      }
    } catch (error) {
      console.error("Error fetchig posts: ", error);
      setErrorHandle(true);
      return [];
    }
  };
  const editSpice = async (id, formData) => {
    try {
      const url = `/spices/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("update failed");
      }
      console.log("update successful!");
      getSpices(id);
      getSpices();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSpice = async (id) => {
    console.log("deleting spice with ID:", id);
    try {
      const url = `/spices/${id}`;
      await fetch(url, { method: "DELETE" });
      console.log(`spice with ${id} is successfully deleted!`);
      getSpices();
    } catch (error) {
      console.log(error);
      setErrorHandle(true);
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
        <Route
          path="/"
          element={
            <SpiceCabinet
              storedSpices={storedSpices}
              getSpices={getSpices}
              deleteSpice={deleteSpice}
            />
          }
        />
        <Route
          path="view"
          element={
            <ViewSpice
              viewSpice={viewSpice}
              editSpice={editSpice}
              handleEditSpice={handleEditSpice}
            />
          }
        />
        <Route
          path="create"
          element={
            <CreateSpice
              createNewSpice={createNewSpice}
              isLoading={isLoading}
              isAnalyzing={isAnalyzing}
              getSpices={getSpices}
              setIsAnalyzing={setIsAnalyzing}
              setIsLoading={setIsLoading}
              newSpiceId={newSpiceId}
            />
          }
        />
        <Route
          path="edit"
          element={<EditSpice editSpice={editSpice} viewSpice={viewSpice} />}
        />
        <Route path="shopping" element={<ShoppingList />} />
        <Route 
          path="/error" 
          element={<ErrorHandle errorHandle={errorHandle}/>} />
        <Route 
          path="*" 
          element={<ErrorHandle />} />
      </Routes>
    </div>
  );
}

export default App;
