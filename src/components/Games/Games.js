import React, { useEffect, useCallback, useState } from "react";
import classes from "./Games.module.css";
import GamesCards from "../GameCards/GameCards";
import LoaderModal from "../Loader/Loader";
import { request } from "../../petitions/petitions";

const Games = (props) => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGames = useCallback(async () => {
    const result = await request(
      `games`,
      "GET",
      {},
      localStorage.getItem("token")
    );
    if (result.data.status === 200) {
      setGames(result.data.games);
    } else if (result.data.status === 403) {
      props.history.push("/login");
    }
  }, [setGames, props.history]);

  const setGamesInDB = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await request(
        `games`,
        "POST",
        {},
        localStorage.getItem("token")
      );
      if (result.data.status === 200) {
        getGames();
      } else if (result.data.status === 403) {
        props.history.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [getGames, props.history]);

  useEffect(() => {
    if (props.isLoggedIn && localStorage.getItem("token")) {
      setGamesInDB();
    } else if (!localStorage.getItem("token")) {
      props.history.push("/login");
    }

    return () => {
      setGames([]);
    };
  }, [setGamesInDB, props.isLoggedIn, props.history]);

  return (
    <div className={classes.Games}>
      <div className={classes.GamesTitle}>Games</div>
      {games ? <GamesCards cards={games} /> : null}
      <LoaderModal isLoading={isLoading} />
    </div>
  );
};

export default Games;
