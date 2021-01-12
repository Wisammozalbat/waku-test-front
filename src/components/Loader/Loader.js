import classes from "./Loader.module.css";
import React from "react";
import Loader from "react-loader-spinner";

const LoaderModal = (props) => {
  return (
    <React.Fragment>
      {props.isLoading ? (
        <div className={classes.LoaderModal}>
          <Loader
            type="Puff"
            color="white"
            height={"50vh"}
            width={"50vh"}
            visible={props.isLoading}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default LoaderModal;
