import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReducer, useRef } from "react";

function EditSpice({ viewSpice, editSpice }) {

  const spice = viewSpice[0];
  const formattedDate = new Date(viewSpice[0].last_purchased).toISOString().split("T")[0];

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
      last_purchased: formState.last_purchased === "" ? null : formState.last_purchased,
    };

    const spiceId = spice?.id
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
      <form onSubmit={onSubmit} ref={formRef}>
        <label htmlFor="name">{initialState.name}</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={formChange}
        />
        <label htmlFor="brand">{initialState.brand}</label>
        <input id="brand" type="text" name="brand" value={formState.brand}
          onChange={formChange}/>
        <label htmlFor="current_weight">{initialState.current_weight}</label>
        <input
          id="current_weight"
          type="text"
          name="current_weight"
          value={formState.current_weight}
          onChange={formChange}
          className="current_weight"
        />
        <label htmlFor="last_purchased">{initialState.last_purchased}</label>
        <input
          id="last_purchased"
          type="date"
          name="last_purchased"
          value={formState.formattedDate}
          onChange={formChange}
          className="last_purchased"
        />
        <label htmlFor="notes">{initialState.notes}</label>
        <input
          id="notes"
          type="text"
          name="notes"
          value={formState.notes}
          onChange={formChange}
          className="notes"
        />
        <button type="submit">save changes</button>
      </form>
    </div>
  );
}

export default EditSpice;
