import React, { useState, useEffect } from "react";
import GuessForm from "./GuessForm";

const GamePage = (props) => {
  const [games, setGames] = useState([]);
  const [randomGame, setRandomGame] = useState(null);

  const getGames = async () => {
    try {
      const response = await fetch("/api/v1/games");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setGames(body.games);

      if (body.games.length > 0) {
        const randomIndex = Math.floor(Math.random() * body.games.length);
        setRandomGame(body.games[randomIndex]);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="game-page">
      <h2>Guess The Pokemon!</h2>
      {randomGame ? (
        <div>
          <h3>Pokemon: {randomGame.speciesName}</h3>
          <h4>Pokedex Number: {randomGame.pokedexNumber}</h4>
          <h4>Type: {randomGame.type}</h4>
          <img src={randomGame.imageUrl} alt={randomGame.speciesName} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <GuessForm />
    </div>
  );
};

export default GamePage;
