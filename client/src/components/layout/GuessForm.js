import React, { useState } from "react";

const GuessForm = ({ userGuess }) => {
  return (
    <div>
      <form>
        <label>
          Your guess:
          <input type="text" name="content" />
        </label>
      </form>
    </div>
  );
};

export default GuessForm;
