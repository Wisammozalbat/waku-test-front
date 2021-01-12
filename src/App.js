import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";

import Games from "./components/Games/Games";
import Deals from "./components/Deals/Deals";
import Login from "./components/Login/Login";
import SearchPage from "./components/Search/SearchPage/SearchPage";

import classes from "./App.module.css";

import { FaGamepad } from "react-icons/fa";
import Navigation from "./components/Navigation/Navigation";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const loginHandler = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUser(null);
    resetSearchValue();
    localStorage.clear();
  };

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const resetSearchValue = () => {
    setSearchValue("");
  };

  return (
    <Router>
      <div className={classes.Header}>
        {/* Logo */}
        <Link
          className={classes.Logo}
          to={isLoggedIn ? "/games" : "/login"}
          onClick={resetSearchValue}
        >
          <FaGamepad className={classes.Icon} />
          <div className={classes.Name}>GG-Games</div>
        </Link>

        <Navigation
          user={user}
          onSearch={onSearch}
          isLoggedIn={isLoggedIn}
          resetSearchValue={resetSearchValue}
          logoutHandler={logoutHandler}
        />
      </div>

      {!isLoggedIn ? <Redirect to="/login" /> : null}

      {isLoggedIn && searchValue !== "" ? (
        <Redirect to={`/search/${searchValue}`} />
      ) : null}

      <Switch>
        <Route
          path="/login"
          render={(props) => <Login {...props} setLoggedIn={loginHandler} />}
        />
        <Route
          path="/search/:title"
          render={(props) => (
            <SearchPage
              {...props}
              isLoggedIn={isLoggedIn}
              searchValue={searchValue}
            />
          )}
        />
        <Route
          path="/games"
          render={(props) => <Games {...props} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/deals"
          render={(props) => <Deals {...props} isLoggedIn={isLoggedIn} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
