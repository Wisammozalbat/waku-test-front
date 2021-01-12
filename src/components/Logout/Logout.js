import React from "react";
import classes from "./Logout.module.css";
import { withRouter } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

import { RiLogoutCircleLine } from "react-icons/ri";

const Logout = (props) => {
  const logout = () => {
    props.history.push("/login");
    props.logoutHandler();
  };

  return (
    <GoogleLogout
      clientId="193256734585-9tggeblprt0mke75lqsufm5la6bn2jb8.apps.googleusercontent.com"
      render={(renderProps) => (
        <div
          onClick={renderProps.onClick}
          className={classes.LogoutButtonContainer}
        >
          <RiLogoutCircleLine className={classes.LogoutButton} />
        </div>
      )}
      buttonText="Logout"
      onLogoutSuccess={logout}
    ></GoogleLogout>
  );
};

export default withRouter(Logout);
