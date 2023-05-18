import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const GameForm = () => {
  const history = useHistory();
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: "",
  });

  const postGame = async (newGameData) => {
    try {
      const response = await fetch(`/api/v1/games`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newGameData),
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
        setGames([...games, responseBody.newGame]); // Use `responseBody.newGame`
        const gameId = responseBody.newGame.id; // Access `id` from `newGame`
        history.push(`/games/${gameId}`); // Redirect to the game show page
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setNewGame({
      ...newGame,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postGame(newGame);
    clearForm();
  };

  const clearForm = () => {
    setNewGame({
      title: "",
    });
  };

  return (
    <div>
      <h1>Add a game</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Game title:
          <input type="text" name="title" onChange={handleInputChange} value={newGame.title} />
        </label>
        <div>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default GameForm;
