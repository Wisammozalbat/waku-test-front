import React, { useEffect, useState } from "react";
import classes from "./GameCards.module.css";
import GameCard from "./GameCard/GameCard";

const GamesCards = (props) => {
  const [games, setGames] = useState([...props.cards]);

  const sortBy = (param, dir) => {
    let aux = [...games?.map((game) => ({ ...game }))];

    //sorting algorithing
    aux = aux?.sort((a, b) => {
      if (dir === "asc") {
        return a[param] > b[param] ? 1 : -1;
      }
      return a[param] < b[param] ? 1 : -1;
    });

    setGames([...aux?.map((game) => ({ ...game }))]);
  };

  useEffect(() => {
    setGames(props.cards);
  }, [props.cards]);

  return (
    <React.Fragment>
      <div className={classes.FilterOptions}>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("external", "asc")}
        >
          A-Z
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("external", "desc")}
        >
          Z-A
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("cheapest", "asc")}
        >
          Lowest Price
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("cheapest", "desc")}
        >
          Highest Price
        </div>
      </div>
      <div className={classes.CardsContainer}>
        {games?.map((game) => {
          return <GameCard key={game._id} game={game} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default GamesCards;
