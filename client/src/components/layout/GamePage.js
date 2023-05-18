import React, { useState, useEffect } from "react";
import GuessForm from "./GuessForm";

const GamePage = (setGame) => {
  const [pokemons, setPokemons] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);

  const getPokemons = async () => {
    try {
      const response = await fetch("/api/v1/pokemons");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setPokemons(body.pokemons);

      if (body.pokemons.length > 0) {
        const randomIndex = Math.floor(Math.random() * body.pokemons.length);
        setRandomPokemon(body.pokemons[randomIndex]);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="game-page">
      <h2>Guess The Pokemon!</h2>
      {randomPokemon ? (
        <div>
          <h3>Pokemon: {randomPokemon.speciesName}</h3>
          <h4>Pokedex Number: {randomPokemon.pokedexNumber}</h4>
          <h4>Type: {randomPokemon.type}</h4>
          <img src={randomPokemon.imageUrl} alt={randomPokemon.speciesName} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* <GuessForm pokemon={randomGame} key={randomGame.id} /> */}
    </div>
  );
};

export default GamePage;
