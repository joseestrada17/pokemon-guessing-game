import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = (props) => {
  return (
    <div className="welcome-page">
      <div className="welcome-message">
        <h2>Pokemon Guessing Game</h2>
        <h4>
          <Link to="/play">Play Game</Link>
        </h4>
      </div>
      <p className="authors">Developed and Designed by: Jose Estrada</p>
    </div>
  );
};

export default WelcomePage;
