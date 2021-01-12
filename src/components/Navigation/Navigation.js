import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

import SearchButton from "../Search/SearchButton/SearchButton";
import Logout from "../Logout/Logout";

const Navigation = ({
  user,
  onSearch,
  isLoggedIn,
  resetSearchValue,
  logoutHandler,
}) => {
  return (
    <React.Fragment>
      {/* SearchBar */}
      {isLoggedIn ? <SearchButton onSearch={onSearch} /> : null}

      {/* Navbar */}
      <nav className={classes.Links}>
        {isLoggedIn ? (
          <React.Fragment>
            <NavLink
              className={classes.Link}
              activeClassName={classes.Active}
              onClick={resetSearchValue}
              to="/games"
            >
              Games
            </NavLink>
            <NavLink
              activeClassName={classes.Active}
              className={classes.Link}
              onClick={resetSearchValue}
              to="/deals"
            >
              Deals
            </NavLink>
          </React.Fragment>
        ) : (
          <NavLink
            activeClassName={classes.Active}
            className={classes.Link}
            to="/login"
          >
            Login
          </NavLink>
        )}

        {/* User Info */}
        {user ? (
          <div className={[classes.Link, classes.profileInfo].join(" ")}>
            <div>{user.name}</div>
            <img className={classes.Image} src={user.imageUrl} alt="profile" />
          </div>
        ) : null}
      </nav>

      {/* Logout Button */}
      {isLoggedIn ? <Logout logoutHandler={logoutHandler} /> : null}
    </React.Fragment>
  );
};

export default Navigation;
