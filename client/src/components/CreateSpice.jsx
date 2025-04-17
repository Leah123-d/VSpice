function CreateSpice(){
  return(
      <form>
        <label htmlFor="spiceImage">Spice Image Upload</label>
        <div className="text-xl bg-gray-500 max-w-7xl max-h-7xl">
        <input type="file" id="spiceImage"></input>
        </div>
      </form>
  )
}

export default CreateSpice