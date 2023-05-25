import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const WelcomePage = ({ user }) => {
  const history = useHistory();
  const [pokemonImages, setPokemonImages] = useState([]);

  useEffect(() => {
    const fetchRandomPokemonImages = async () => {
      try {
        const response = await fetch("/api/v1/pokemons"); // Fetch from your provided API endpoint
        const data = await response.json();
        const { pokemons } = data;
        const randomPokemons = getRandomElements(pokemons, 2);
        const pokemonImageUrls = randomPokemons.map((pokemon) => pokemon.imageUrl);

        setPokemonImages(pokemonImageUrls);
      } catch (error) {
        console.log("Error fetching Pokemon images:", error);
      }
    };

    fetchRandomPokemonImages();
  }, []);

  const getRandomElements = (array, count) => {
    const shuffled = array.slice();
    let i = array.length;
    const min = i - count;
    let temp;
    let index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  };

  const handlePlayGame = () => {
    if (user) {
      history.push("/games");
    } else {
      history.push("/user-sessions/new");
    }
  };

  const handleNewGame = () => {
    if (user) {
      history.push("/newgame");
    } else {
      history.push("/user-sessions/new");
    }
  };

  return (
    <div className="welcome-page">
      <div className="welcome-message">
        <h2>Pokemon Guessing Game</h2>
        <h4>
          <button className="button-box" onClick={handlePlayGame}>
            Play a game
          </button>
        </h4>
      </div>
      <h4>
        <button className="button-box" onClick={handleNewGame}>
          Make a new game
        </button>
      </h4>{" "}
      <div className="pokemon-images">
        {pokemonImages.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Pokemon ${index + 1}`} className="pokemon-image" />
        ))}
      </div>
      <p className="authors">Developed and Designed by: Jose Estrada</p>
    </div>
  );
};

export default WelcomePage;
