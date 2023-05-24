import React, { useEffect, useState } from "react";
import GameTile from "./GameTile.js";

const GameList = (props) => {
  const [games, setGames] = useState([]);

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
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  const gamesListArray = games.map((game) => {
    return <GameTile user={props.user} game={game} key={game.id} />;
  });

  return (
    <div>
      <h2 className="left-space bottom-space">Games</h2>
      <div className="left-space games-pokemon-gbc-frame">{gamesListArray}</div>
    </div>
  );
};

export default GameList;
