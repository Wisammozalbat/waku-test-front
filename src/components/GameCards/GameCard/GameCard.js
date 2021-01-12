import React, { useEffect, useState } from "react";
import classes from "./GameCard.module.css";

const GameCard = (props) => {
  const [game, setGame] = useState({
    cheapest: 0,
    external: "",
    gameID: 0,
    steamAppID: 0,
    thumb: "",
    __v: 0,
    _id: "",
  });

  useEffect(() => {
    setGame(props.game);
  }, [props.game]);

  return (
    <div>
      <a
        href={`http://store.steampowered.com/app/${game.steamAppID}/`}
        target="_blank"
        rel="noreferrer"
        className={classes.CardContainer}
        key={game._id}
      >
        <div className={classes.ImageContainer}>
          <img
            className={classes.Image}
            src={game.thumb}
            alt="Game Thumbnail"
          />
        </div>
        <div className={classes.Description}>
          <div className={classes.Title}>{game.external}</div>
          <div className={classes.Price}>Price: ${game.cheapest}</div>
        </div>
      </a>
    </div>
  );
};

export default GameCard;
