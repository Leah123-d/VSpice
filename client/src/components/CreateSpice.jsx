//adjust to use, use reducer
//Other componenets are going to use the stored data, not the initial fetch data.
//I think I will be fetching the image analyzer from here
import { useState } from "react";

function CreateSpice({createNewSpice}) {
  const [spiceImage, setSpiceImage] = useState(null);

  const handleUpload =  (e) => {
    const file = e.target.files[0]
    setSpiceImage(file); 
    createNewSpice(file);
    e.target.value = null;
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if(!spiceImage){
  //     alert("please upload an image first");
  //     return;
  //   }

  //   console.log("data from handleSubmit", spiceImage)

  //   createNewSpice(spiceImage);
  // }

  return (
    <div className="flex align-middle justify-center">
      <section className="analyze-section">
        <div className="image-container">
          {spiceImage && <img src={URL.createObjectURL(spiceImage)} />}
        </div>
        <p className="extra-info">
          <span>
          <label htmlFor="files">Spice Image Upload</label>
          {/* can hide input and use label to make the upload window to appear */}
          <input
            onChange={handleUpload}
            type="file"
            id="files"
            name="file"
            accept="image/*"
          ></input>
          </span>
        </p>
      </section>
    </div>
  );
}

export default CreateSpice;
