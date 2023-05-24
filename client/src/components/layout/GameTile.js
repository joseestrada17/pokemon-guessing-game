import React from "react";
import { Link } from "react-router-dom";

const GameTile = ({ game, user }) => {
  const isCurrentUserGame = user.id === game.userId;
  return (
    <div>
      <p>
        {game.title}
        <Link className="play" to={`/games/${game.id}/play`}>
          Play game
        </Link>
        {isCurrentUserGame && (
          <Link className="edit" to={`/games/${game.id}`}>
            Edit game
          </Link>
        )}
      </p>
    </div>
  );
};

export default GameTile;
