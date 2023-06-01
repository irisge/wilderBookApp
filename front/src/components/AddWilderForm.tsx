import { SetStateAction, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_WILDER, GET_ALL_WILDERS_AND_SKILLS } from "../graphQL/queries";

const AddWilderForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { refetch } = useQuery(GET_ALL_WILDERS_AND_SKILLS);


  const [addWilder, { loading, error }] = useMutation(CREATE_WILDER, {
    onCompleted: (data) => {
    console.log("Added data:", data.addWilder);
    setInputValue("");
    refetch()
  },
  onError: (error) => {
    console.error("Error adding data:", error);
  },
});

if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Error: {error.message}</p>;
}

  const handleChangeInput = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addWilder({ variables: { name: inputValue } });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input value={inputValue} onChange={handleChangeInput} />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Data"}
      </button>
    </form>
  );
};

export default AddWilderForm;
