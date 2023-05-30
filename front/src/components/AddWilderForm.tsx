import axios from "axios";
import { useState } from "react";
const AddWilderForm = () => {
  const [wilderName, setWilderName] = useState("");
  return (
    <div>
      <input
        value={wilderName}
        onChange={(e) => {
          setWilderName(e.target.value);
        }}
      />
      <br />
      <button
        onClick={async () => {
          try {
            await axios.post("http://localhost:5000/api/wilder", {
              name: wilderName,
            });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Save Wilder
      </button>
    </div>
  );
};

export default AddWilderForm;
