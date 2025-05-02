import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  View,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronsDownUp,
} from "lucide-react";

function SpiceCabinet({ storedSpices, getSpices, deleteSpice }) {
  const navigate = useNavigate();
  const [displaySpices, setDisplaySpices] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [sortKey, setSortKey] = useState("name");
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (isDeleted) {
      const timer = setTimeout(() => {
        setIsDeleted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    setDisplaySpices(storedSpices);
  }, [isDeleted, storedSpices]);

  function formatDate(date) {
    return date ? new Date(date).toISOString().split("T")[0] : "-";
  }

  function sortSpices(key) {
    if (sortKey === key) {
      setIsAscending(!isAscending);
    } else {
      setSortKey(key);
      setIsAscending(true);
    }
    const sorted = [...displaySpices].sort((a, b) => {
      const aVal = a[key]?.toString().toLowerCase() ?? "";
      const bVal = b[key]?.toString().toLowerCase() ?? "";

      if (aVal < bVal) return isAscending ? -1 : 1;
      if (aVal > bVal) return isAscending ? 1 : -1;

      return 0;
    });
    setDisplaySpices(sorted);
  }

  return (
    <div className="flex flex-col">
      {isDeleted && (
        <div
          className="mt-2 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
          role="alert"
          aria-labelledby="hs-soft-color-success-label"
        >
          <span id="hs-soft-color-success-label" className="font-bold">
            Spice succesfully deleted!
          </span>
        </div>
      )}
      <h1>Spice Cabinet</h1>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-neutral-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead className="bg-gray-50 dark:bg-neutral-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    <div className="flex items-center gap-x-1">
                      Name
                      <button onClick={() => sortSpices("name")}>
                        {sortKey === "name" ? (
                          isAscending ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )
                        ) : (
                          <ChevronsDownUp size={16} />
                        )}
                      </button>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    <div className="flex items-center gap-x-1">
                      Brand
                      <button onClick={() => sortSpices("brand")}>
                        {sortKey === "brand" ? (
                          isAscending ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )
                        ) : (
                          <ChevronsDownUp size={16} />
                        )}
                      </button>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    Full weight
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    <div className="flex items-center gap-x-1">
                      Current weight
                      <button onClick={() => sortSpices("current_weight")}>
                        {sortKey === "current_weight" ? (
                          isAscending ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )
                        ) : (
                          <ChevronsDownUp size={16} />
                        )}
                      </button>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    Expiration date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    <div className="flex items-center gap-x-1">
                      Last Purchased
                      <button onClick={() => sortSpices("last_purchased")}>
                        {sortKey === "last_purchased" ? (
                          isAscending ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )
                        ) : (
                          <ChevronsDownUp size={16} />
                        )}
                      </button>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    View
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {displaySpices &&
                  displaySpices.map((spice) => (
                    <tr key={spice.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {spice.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {spice.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {spice.full_weight ? spice.full_weight + " g" : ""} 
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {spice.current_weight ? spice.current_weight + " g" : ""} 
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {spice.expiration_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {spice.last_purchased}
                        {formatDate(spice.expiration_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {formatDate(spice.last_purchased)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          aria-label="View-one-spice"
                          onClick={async () => {
                            await getSpices(spice.id);
                            navigate("/view");
                          } }
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                        >
                          View
                          }}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                        >
                          <View />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          aria-label="Delete"
                          onClick={async () => {
                            await deleteSpice(spice.id);
                            setIsDeleted(true);
                          }}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                        >
                          Delete
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpiceCabinet;
