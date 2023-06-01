import { useMutation, useQuery } from '@apollo/client';
import React, { SetStateAction, useState } from 'react';
import { CREATE_WILDER, GET_ALL_WILDERS_AND_SKILLS } from '../graphQL/queries';

const SimpleComponent = () => {

    const [inputValue, setInputValue] = useState("");

    const { data, refetch } = useQuery(GET_ALL_WILDERS_AND_SKILLS, {
        onCompleted: (data) => {
        console.log("Added data:", data.addWilder);
        setInputValue("");
        refetch()
      },
      onError: (error) => {
        console.error("Error adding data:", error);
      },
    });


    const [addWilder, {loading, error}] = useMutation(CREATE_WILDER);

    console.log(data)


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
      <button type="submit"  >{loading? 'Submitting...': 'error'} 
      </button>
    </form>
  );
};

export default SimpleComponent;