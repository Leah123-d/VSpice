//adjust to use, use reducer
//Other componenets are going to use the stored data, not the initial fetch data.
//I think I will be fetching the image analyzer from here 
import { useState } from 'react'

function CreateSpice({createNewSpice}){
  const [spiceImage, setSpiceImage] = useState(null);

  const handleImageUpload = (e) =>{
    const file = e.target.files[0];
    setSpiceImage(file);  
    console.log(typeof file);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!spiceImage){
      alert("please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("spiceImage", spiceImage);
    console.log("data from handleSubmit", formData)

    createNewSpice(formData);
  }
  return(
    <div className="flex align-middle justify-center">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="spiceImage">Spice Image Upload</label>
        <div>
          {/* can hide input and use label to make the upload window to appear */}
        <input type="file" id="spiceImage" onChange={handleImageUpload}></input>
        </div>
        <div>
          <button type="submit" className="outline-2 rounded-md p-2">upload</button>
        </div>
      </form>
      </div>

  )
}

export default CreateSpice