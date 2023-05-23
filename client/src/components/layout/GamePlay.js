import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  };

  const isPokemon = (pokemon) => {
    return pokemon.trim() !== "";
  };

  useEffect(() => {
    getGame();
  }, [id]);

  useEffect(() => {
    if (isLoaded && correctGuesses.length === prompts.length) {
      setHasWon(true);
    }
  }, [isLoaded, correctGuesses, prompts]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (hasWon) {
    return (
      <div>
        <h2 className="game-name">Congratulations! You have won the game!</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="game-name">{game.title}</h2>
      <p>Type the Pokémon you think are correct!</p>
      <form onSubmit={handleSubmit}>
        <label className="guess-pokemon">Guess a Pokémon:</label>
        <input
          type="text"
          name="name"
          value={pokemonName}
          onChange={(event) => setPokemonName(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      {isCorrectGuess === true && <p className="guess-feedback">Your guess is correct!</p>}
      {isCorrectGuess === false && <p className="guess-feedback">Your guess is incorrect.</p>}
      {isCorrectGuess === false && !isPokemon(pokemonName) && (
        <p className="guess-feedback">Invalid Pokémon name.</p>
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
