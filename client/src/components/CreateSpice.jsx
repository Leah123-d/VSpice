function CreateSpice(){
  return(
   
    <div className="flex align-middle justify-center">
      <form >
        <label htmlFor="spiceImage">Spice Image Upload</label>
        <div>
        <input type="file" id="spiceImage" ></input>
        </div>
        <div>
          <button className="outline-2 rounded-md p-2">upload</button>
        </div>
      </form>
      </div>

  )
}

export default CreateSpice