import { useState } from "react";

function ViewSpice({ spiceAnalyze, isLoading }) {
  const [showSpice, setShowSpice] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setShowSpice(true);
  };
  return (
    <div>
      {isLoading && (
        <p>Loading...</p>
      )}
      {spiceAnalyze && !isLoading &&
        (<button
          onClick={handleClick}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          View Spice
        </button>
      )}
      {showSpice &&  (
        <p>
          Spice Brand: {spiceAnalyze.brand}
          Total Grams Full: {spiceAnalyze.total_grams_full}
          Expiration_date:{" "}
          {spiceAnalyze.expiration_date ? spiceAnalyze.expiration_date : "none"}
        </p>
      )}
    </div>
  );
}

export default ViewSpice;
