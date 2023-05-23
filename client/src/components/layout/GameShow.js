import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const GameShow = (props) => {
  const { id } = useParams();

  const [game, setGame] = useState({
    title: "",
  });
  const [pokemonName, setPokemonName] = useState("");
  const [prompts, setPrompts] = useState([]);

  const getGame = async () => {
    try {
      const response = await fetch(`/api/v1/games/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const data = await response.json();
      setGame(data.game);
      setPrompts(data.prompts);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/v1/prompts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pokemonName: pokemonName, gameId: id }),
      });

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const promptData = await response.json();

      setPrompts([...prompts, promptData.prompt]);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div className="margin">
      <form onSubmit={handleSubmit}>
        <label className="add-pokemon">Add a pokemon:</label>
        <input
          type="text"
          name="name"
          value={pokemonName}
          onChange={(event) => setPokemonName(event.target.value)}
        />

        <input type="submit" />
        <h3 className="game-name">{game.title}</h3>
      </form>
      <div className="pokemon-grid pokemon-gbc-frame">
        {prompts.map((prompt) => (
          <div className="text-with-arrow">
            <span className="image">
              <p className="text" key={prompt.id}>
                {prompt.correctPokemonName}
              </p>
            </span>
          </div>
        ))}
      </div>
      <Link to={`/games/${id}/play`}>Play Game!</Link>
    </div>
  );
};

export default GameShow;
