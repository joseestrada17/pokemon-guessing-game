import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import WelcomePage from "./layout/WelcomePage";
import GameShow from "./layout/GameShow";
import GameForm from "./layout/GameForm";
import GameList from "./layout/GameList";
import GamePlay from "./layout/GamePlay";
import UserProfile from "./layout/UserProfile";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="global-style">
      <Router>
        <TopBar user={currentUser} />
        <Switch>
          <Route exact path="/">
            <WelcomePage user={currentUser} />
          </Route>
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
          <Route exact path="/games">
            <GameList user={currentUser} />
          </Route>
          <Route exact path="/games/:id">
            <GameShow user={currentUser} />
          </Route>
          <Route exact path="/games/:id/play" component={GamePlay} />
          <Route exact path="/newgame" component={GameForm} />
          <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
        </Switch>
      </Router>
    </div>
  );
};

export default hot(App);
