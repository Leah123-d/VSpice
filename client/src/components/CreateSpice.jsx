import { useState } from "react";

function CreateSpice({createNewSpice}) {
  const [spiceImage, setSpiceImage] = useState(null);

  const handleUpload =  (e) => {
    const file = e.target.files[0]
    setSpiceImage(file); 
    createNewSpice(file);
    e.target.value = null;
  }
  return (
    <div className="flex align-middle justify-center">
      <section className="analyze-section">
        <div className="image-container">
          {spiceImage && <img src={URL.createObjectURL(spiceImage)} />}
        </div>
        <p className="extra-info">
          <span>
          <label htmlFor="files">Spice Image Upload</label>
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
