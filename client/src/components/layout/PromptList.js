import React, { useEffect, useState } from "react";

const PromptList = (props) => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  const gamesListArray = games.map((game) => {
    return <GameTile game={game} key={game.id} />;
  });

  return (
    <div>
      <h2>Games</h2>
      <div>{gamesListArray}</div>
    </div>
  );
};

export default GameList;
