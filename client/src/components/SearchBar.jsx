import { useState } from "react";
function SearchBar({ setSearchResult }) {
  const [searchSpice, setSearchSpice] = useState("");

  const fetchSpiceSearch = async (name) => {
    try {
      const res = await fetch(`spices/search/${name}`);

      if (!res.ok) throw new Error("failed to fetch spice");

      const data = await res.json();
      console.log("fetched spice: ", data);

      setSearchResult(data);
    } catch (error) {
      console.error("error fetch spice: ", error);
      return [];
    }
  };

  const handleChange = (name) => {
    setSearchSpice(name);
  };

  const handleSubmit = () => {
    fetchSpiceSearch(searchSpice);
  };

  const handleReset = () => {
    setSearchSpice("");
    setSearchResult("");
  };
  const handleEnterKey = (e) =>{
    if(e.key === 'Enter'){
      handleSubmit();
    }
  }
  return (
    <div className="flex justify-end">
      <div className="max-w-xs">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5"></div>
          <input
            className="p-1 py-2.5 *:ps-10 pe-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            type="text"
            aria-expanded="false"
            placeholder="Type a spice name"
            value={searchSpice}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <button
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-hidden focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
            onClick={() => handleSubmit()}
          >
            search
          </button>
          <button
            className="m-1 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-hidden focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
            onClick={() => handleReset()}
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
