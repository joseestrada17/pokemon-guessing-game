import React, { useEffect, useState } from "react";

const UserProfile = ({ user }) => {
  const [userGames, setUserGames] = useState([]);

  const getGames = async () => {
    try {
      const response = await fetch(`/api/v1/games`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const gameBody = await response.json();

      setUserGames(gameBody.games);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  const gamesArray = userGames
    .filter((game) => game.userId === user.id)
    .map((game) => {
      return (
        <div key={game.id}>
          <p>{game.title}</p>
        </div>
      );
    });
  return (
    <div>
      <div className="grid-x grid-container">
        <div className="profile-box cell medium-6">
          <div className="cell">
            <h2>Account Information:</h2>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </div>
      <div className="callout profile-games">
        <h3>User's Games</h3>
        {gamesArray}
      </div>
    </div>
  );
};

export default UserProfile;
