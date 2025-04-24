import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
function ViewSpice({ viewSpice, handleEditSpice }) {
  //can add the math for current weight here and display that as a status
  const navigate = useNavigate();

  console.log("in view spice component", viewSpice);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-2xs sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div className="shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
        <img
          className="size-full absolute top-0 start-0 object-cover"
          src="https://www.savoryspiceshop.com/cdn/shop/products/citrus-pepper-seasoning_jar-crop_695x579.jpg?v=1739378887"
          alt="Card Image"
        />
      </div>
      <div className="flex flex-wrap">
        {viewSpice &&
          viewSpice.map((spice) => (
            <div key={spice.id} className="p-4 flex flex-col h-full sm:p-7">
              <h3
                
                className="text-lg font-bold text-gray-800 dark:text-white"
              >
                {spice.name}
              </h3>
              <ul className="mt-1 text-gray-500 dark:text-neutral-400">
                <ul key={spice.id}>
                  <li>Brand: {spice.brand}</li>
                  <li>Current weight: {spice.current_weight}</li>
                  <li>Expiration date: {spice.expiration_date}</li>
                  <li>Notes: {spice.notes}</li>
                </ul>
              </ul>
              <div className="mt-5 sm:mt-auto">
                <button
                  onClick={async () => {await handleEditSpice(spice.id); navigate('/edit')}}
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-yellow-500 text-yellow-500 hover:border-yellow-400 focus:outline-hidden focus:border-yellow-400 focus:text-yellow-400 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewSpice;
