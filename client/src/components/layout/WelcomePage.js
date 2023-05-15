import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = (props) => {
  return (
    <div>
      <h2 className="welcome-message">Pokemon Guessing Game</h2>
      <h4 className="welcome-message">
        <Link to="/play">Play Game</Link>
      </h4>
      <p className="authors">Developed and Designed by: Jose Estrada</p>
    </div>
  );
};

export default WelcomePage;
