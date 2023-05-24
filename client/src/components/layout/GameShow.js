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
  const [suggestions, setSuggestions] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setPokemonName(value);
    getSuggestions(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const getSuggestions = (value) => {
    const filteredSuggestions = pokemonNames.filter((name) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const promptData = await fetch(`/api/v1/prompts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pokemonName: pokemonName, gameId: id }),
      });

      if (!promptData.ok) {
        const errorMessage = `${promptData.status} (${promptData.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const prompt = await promptData.json();

      setPrompts([...prompts, prompt.prompt]);
      setPokemonName("");
      setSuggestions([]);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPokemonName(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    getGame();
  }, []);

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const data = await response.json();
        const names = data.results.map((pokemon) => pokemon.name);
        setPokemonNames(names);
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
      }
    };

    fetchPokemonNames();
  }, []);

  return (
    <div className="margin">
      <h2>Add correct pokemon to your game.</h2>
      <form onSubmit={handleSubmit}>
        <label className="add-pokemon">Add a pokemon:</label>
        <input type="text" name="name" value={pokemonName} onChange={handleInputChange} />
        {showSuggestions && (
          <div className="suggestions-window">
            <div className="suggestions">
              {suggestions.map((suggestion) => (
                <p key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </p>
              ))}
            </div>
          </div>
        )}
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
