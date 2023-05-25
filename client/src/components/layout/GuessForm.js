import React, { useState } from "react";

const GuessForm = ({ game, setGuess }) => {
  const [newGuess, setNewGuess] = useState({
    guess: "",
  });
  const [errors, setErrors] = useState([]);

  const postGuess = async (newGuessData) => {
    try {
      const response = await fetch(`/api/v1/guesses`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newGuessData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const responseBody = await response.json();
        setErrors([]);
        setGuess([...guesses, responseBody.guess]);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setNewGuess({
      ...newGuess,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postGuess(newGuess);
    clearForm();
  };

  const clearForm = () => {
    setNewGuess({
      guess: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Your guess:
          <input type="text" name="guess" onChange={handleInputChange} value={newGuess.guess} />
        </label>
      </form>
    </div>
  );
};

export default GuessForm;
