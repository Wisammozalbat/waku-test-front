import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import classes from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";

const Login = (props) => {
  const login = async (user) => {
    await axios({
      method: "POST",
      url: `http://localhost:${
        process.env.REACT_APP_SERVER_PORT || 4000
      }/session/login`,
      data: {
        id: user.googleId,
        name: user.name,
        email: user.email,
        image: user.imageUrl,
      },
    }).then((res) => {
      if (res.data.status === 200) {
        const { data } = res;
        const { id, email, name, image } = data.user;
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id, email, name, image })
        );
        props.history.push("/games");
        props.setLoggedIn({
          googleId: id,
          email: email,
          name: name,
          imageUrl: image,
        });
      }
    });
  };

  return (
    <div className={classes.Login}>
      <h2 className={classes.LoginTitle}>Login</h2>
      <GoogleLogin
        clientId="193256734585-9tggeblprt0mke75lqsufm5la6bn2jb8.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className={classes.LoginButton}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <FcGoogle className={classes.GoogleIcon} />
            <div className={classes.SignText}>Sign in with Google</div>
          </button>
        )}
        buttonText="Login"
        onSuccess={(response) => login(response.profileObj)}
        onFailure={() => console.log("failed")}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
