import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const GamePlay = () => {
  const { id } = useParams();

  const [game, setGame] = useState({
    title: "",
  });
  const [prompts, setPrompts] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [isCorrectGuess, setIsCorrectGuess] = useState(null);
  const [hasWon, setHasWon] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getGame = async () => {
    try {
      const response = await fetch(`/api/v1/games/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setGame(data.game);
      setPrompts(data.prompts);
      setIsLoaded(true);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const pokemon = pokemonName.toLowerCase();

    if (!isPokemon(pokemon)) {
      setIsCorrectGuess(false);
      setPokemonName("");
      return;
    }

    const foundPrompt = prompts.find(
      (prompt) => prompt.correctPokemonName.toLowerCase() === pokemon
    );

    if (foundPrompt) {
      setIsCorrectGuess(true);
      setCorrectGuesses([...correctGuesses, pokemon]);
    } else {
      setIsCorrectGuess(false);
      setIncorrectGuesses([...incorrectGuesses, pokemon]);
    }

    setPokemonName("");
    setSuggestions([]);
  };

  const isPokemon = (pokemon) => {
    const formattedPokemon = pokemon.toLowerCase();
    return pokemonNames.includes(formattedPokemon);
  };

  const handleSuggestionClick = (suggestion) => {
    setPokemonName(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    getGame();
  }, []);

  useEffect(() => {
    if (isLoaded && correctGuesses.length === prompts.length) {
      setHasWon(true);
    }
  }, []);

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          throw new Error(errorMessage);
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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (hasWon) {
    return (
      <div>
        <h2 className="game-name">Congratulations! You have won the game!</h2>
        <p>
          <Link to={`/games`}>Play another game</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="margin">
      <h2 className="game-name">{game.title}</h2>
      <p>Type the Pokémon you think are correct!</p>
      <form onSubmit={handleSubmit}>
        <label className="add-pokemon">Guess a pokemon:</label>
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
        <input type="submit" value="Submit" />
      </form>
      {isCorrectGuess === true && <p className="guess-feedback">Your guess is correct!</p>}
      {isCorrectGuess === false && isPokemon(pokemonName) && (
        <p className="guess-feedback">Your guess is incorrect.</p>
      )}
      {isCorrectGuess === false && !isPokemon(pokemonName) && (
        <p className="error-message">Invalid Pokémon name. Please enter a valid Pokémon.</p>
      )}
      <div>
        <h3>Correct Guesses:</h3>
        <ul>
          {correctGuesses.map((guess, index) => (
            <li key={index}>{guess}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Incorrect Guesses:</h3>
        <ul>
          {incorrectGuesses.map((guess, index) => (
            <li key={index}>{guess}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamePlay;
