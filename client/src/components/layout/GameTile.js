import React, { useState } from "react";
import { Link } from "react-router-dom";

const GameTile = ({ game, user }) => {
  const isCurrentUserGame = user.id === game.userId;
  const [voteCount, setVoteCount] = useState(game.voteCount || 0);

  const handleVote = (voteValue) => {
    fetch("/api/v1/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voteValue,
        gameId: game.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVoteCount(data.voteCount || voteCount); // Update the vote count state
      })
      .catch((error) => {
        console.error("Error voting:", error);
      });
  };

  const handleUpvote = () => {
    handleVote(1);
  };

  const handleDownvote = () => {
    handleVote(-1);
  };

  return (
    <div>
      <div className="bold">{game.title}</div>
      <p>
        <Link className="line-of-text" to={`/games/${game.id}/play`}>
          Play game
        </Link>
        {isCurrentUserGame && (
          <Link className="line-of-text" to={`/games/${game.id}`}>
            Edit game
          </Link>
        )}
      </p>
      <div>Votes: {voteCount}</div>
      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={handleDownvote}>Downvote</button>
    </div>
  );
};

export default GameTile;
