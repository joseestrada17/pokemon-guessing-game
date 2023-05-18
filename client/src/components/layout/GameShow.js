import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameShow = (props) => {
  const { id } = useParams();

  const [game, setGame] = useState({
    title: "",
  });
  const getGame = async () => {
    try {
      const response = await fetch(`/api/v1/games/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const gameData = await response.json();
      setGame(gameData.game);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div>
      <h2>{game.title}</h2>
      <p>{game.userId}</p>
    </div>
  );
};

export default GameShow;
