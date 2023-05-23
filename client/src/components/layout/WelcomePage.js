import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = (props) => {
  return (
    <div className="welcome-page">
      <div className="welcome-message">
        <h2>Pokemon Guessing Game</h2>
        <h4>
          <Link className="button-box" to="/games">
            Play a game
          </Link>
        </h4>
      </div>
      <h4>
        <Link className="button-box" to="/newgame">
          Make a new game
        </Link>
      </h4>
      <p className="authors">Developed and Designed by: Jose Estrada</p>
    </div>
  );
};

export default WelcomePage;
