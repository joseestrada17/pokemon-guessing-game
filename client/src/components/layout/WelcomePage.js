import React from "react";
import { Link, useHistory } from "react-router-dom";

const WelcomePage = ({ user }) => {
  const history = useHistory();
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
      </h4>
      <p className="authors">Developed and Designed by: Jose Estrada</p>
    </div>
  );
};

export default WelcomePage;
