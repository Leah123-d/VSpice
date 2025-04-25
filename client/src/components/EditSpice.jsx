import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReducer, useRef } from "react";

function EditSpice({ viewSpice, editSpice }) {
  const spice = viewSpice[0];
  const formattedDate = new Date(viewSpice[0].last_purchased)
    .toISOString()
    .split("T")[0];

  const initialState = {
    name: spice?.name || "",
    brand: spice?.brand || "",
    current_weight: spice?.current_weight || "",
    last_purchased: formattedDate || "",
    notes: spice?.notes || "",
  };

  function formReducer(state, action) {
    switch (action.type) {
      case "FormInput": {
        return {
          ...state,
          [action.formInput.name]: action.formInput.value,
        };
      }
      case "Reset":
        return { ...initialState };

      default:
        throw new Error("invalid action type");
    }
  }
  const navigate = useNavigate();

  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const formRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const udpatedData = {
      ...formState,
      last_purchased:
        formState.last_purchased === "" ? null : formState.last_purchased,
    };

    const spiceId = spice?.id;
    editSpice(spiceId, udpatedData);

    dispatchForm({
      type: "Reset",
    });
    formRef.current.reset();

    navigate("/view");
  };

  function formChange(e) {
    dispatchForm({
      type: "FormInput",
      formInput: { name: e.target.name, value: e.target.value },
    });
  }

  return (
    <div className="formContainer">
      <div className="max-w-s h-auto flex flex-col bg-white border border-gray-200 
        border-t-4 border-t-blue-600 shadow-2xs rounded-xl 
        dark:bg-neutral-900 dark:border-neutral-700 
        dark:border-t-blue-500 dark:shadow-neutral-700/70">
        <div className="p-4 md:p-5 mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {initialState.name}
          </h3>
            <form onSubmit={onSubmit} ref={formRef} className="mt-2 text-gray-500 dark:text-neutral-400">
              <label htmlFor="name">Edit name:</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formState.name}
                onChange={formChange}
              />
              <label htmlFor="brand">Edit brand:{initialState.brand}</label>
              <input
                id="brand"
                type="text"
                name="brand"
                value={formState.brand}
                onChange={formChange}
              />
              <label htmlFor="current_weight">
              Edit current weight:{initialState.current_weight}
              </label>
              <input
                id="current_weight"
                type="text"
                name="current_weight"
                value={formState.current_weight}
                onChange={formChange}
                className="current_weight"
              />
              <label htmlFor="last_purchased">
              Edit last purchased:{initialState.last_purchased}
              </label>
              <input
                id="last_purchased"
                type="date"
                name="last_purchased"
                value={formState.formattedDate}
                onChange={formChange}
                className="last_purchased"
              />
              <label htmlFor="notes">Edit notes:{initialState.notes}</label>
              <input
                id="notes"
                type="text"
                name="notes"
                value={formState.notes}
                onChange={formChange}
                className="notes"
              />
              <button
                type="submit"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-hidden focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
              >
                save changes
              </button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default EditSpice;
