import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateSpice({ createNewSpice, isLoading, getSpices, isAnalyzing }) {
  const navigate = useNavigate();
  const [spiceImage, setSpiceImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setSpiceImage(file);
    createNewSpice(file);
    e.target.value = null;
  };
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

        {isAnalyzing && !isLoading (
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-6 w-6 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Analyzing spice...</span>
          </div>
        )}

        {isLoading && (
          <button
            onClick={async () => {
              await getSpices();
              navigate("/");
            }}
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-hidden focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
          >
            view analyzed spice
          </button>
        )}
      </section>
    </div>
  );
}

export default CreateSpice;
