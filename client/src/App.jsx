import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [viewSpice, setViewSpice] = useState(null);
  const [uploadedSpice, setUploadedSpice] = useState(null);
  const [newSpiceId, setNewSpiceId] = useState(null);

  const handleEditSpice = (id) => {
    console.log(id);
    getSpices(id);
  };
  const createNewSpice = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("image submitted:", formData);

    try {
      const res = await fetch("vision/image", {
        method: "POST",
        body: formData,
      });
      const uploadData = await res.json();
      if (!uploadData.path) {
        console.error("upload did not return valid path");
      }
      setIsLoading(true);
      setIsAnalyzing(true);
      const analyzeRes = await fetch("/vision/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath: uploadData.path }),
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
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSpice = async (id) => {
    console.log("deleting spice with ID:", id);
    try {
      const url = `/spices/${id}`;
      await fetch(url, { method: "DELETE" });     
      getSpices();
      console.log(`spcie with ${id} is successfully deleted!`);
    }
    catch (error) {
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
        <Route
          path="/"
          element={
            <SpiceCabinet storedSpices={storedSpices} getSpices={getSpices} deleteSpice={deleteSpice} />
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
              uploadedSpice={uploadedSpice}
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
        <Route path="*" element={<ErrorHandle />} />
      </Routes>
    </div>
  );
}

export default App;
