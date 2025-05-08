import { useNavigate } from "react-router";
function ViewSpice({ viewSpice, handleEditSpice }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-2xs sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div className="shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
        <img
          className="size-full absolute top-0 start-0 object-cover"
          src="https://www.savoryspiceshop.com/cdn/shop/products/citrus-pepper-seasoning_jar-crop_695x579.jpg?v=1739378887"
          alt="Card Image"
        />
      </div>
      <div className="flex flex-wrap" id="view-spice">
        {viewSpice &&
          viewSpice.map((spice) => (
            <div key={spice.id} className="p-4 flex flex-col h-full sm:p-7">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {spice.name}
              </h3>

              <ul className="mt-1 text-gray-500 dark:text-neutral-400" aria-label="spice">
                <ul key={spice.id}>
                  <li>Brand: {spice.brand}</li>
                  <li>Full weight: {spice.full_weight}</li>
                  <li>Current weight: {spice.current_weight}</li>
                  <li>Expiration date: {spice.expiration_date}</li>
                  <li>Notes: {spice.notes}</li>
                </ul>
              </ul>
              <div className="mt-5 sm:mt-auto">
                <button
                  onClick={async () => {
                    await handleEditSpice(spice.id);
                    navigate(`/edit`);
                  }}
                  type="button"
                  className="m-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-hidden focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await navigate("/");
                  }}
                  type="button"
                  className="m-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-hidden focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
                >
                  Close
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewSpice;
