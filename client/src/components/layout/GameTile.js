import React from "react";
import { Link } from "react-router-dom";

const GameTile = ({ game, user }) => {
  const isCurrentUserGame = user.id === game.userId;
  return (
    <div>
      <p>
        <div className="bold">{game.title}</div>
        <Link className="line-of-text" to={`/games/${game.id}/play`}>
          Play game
        </Link>
        {isCurrentUserGame && (
          <Link className="line-of-text" to={`/games/${game.id}`}>
            Edit game
          </Link>
        )}
      </p>
    </div>
  );
};

export default GameTile;
