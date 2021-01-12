import classes from "./SearchPage.module.css";
import React, { useCallback, useEffect, useState } from "react";
import GamesCards from "../../GameCards/GameCards";
import LoaderModal from "../../Loader/Loader";
import { request } from "../../../petitions/petitions";
import { useParams } from "react-router-dom";

const SearchPage = (props) => {
  const { title } = useParams();
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGames = useCallback(async () => {
    const response = await request(
      `games/${title}`,
      "GET",
      { value: title },
      localStorage.getItem("token")
    );

    if (response.data.status === 200) {
      setGames(response.data.games);
    } else if (response.data.status === 403) {
      props.history.push("/login");
    }
  }, [setGames, title, props.history]);

  const setGamesInDB = useCallback(async () => {
    if (title !== "") {
      try {
        setIsLoading(true);
        setGames([]);
        //Sending POST request in server to update searched games
        const response = await request(
          `games/${title}`,
          "POST",
          { value: title },
          localStorage.getItem("token")
        );
        if (response.data.status === 200) {
          getGames();
        } else if (response.data.status === 403) {
          props.history.push("/login");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [getGames, title, props.history]);

  useEffect(() => {
    if (props.isLoggedIn && localStorage.getItem("token")) {
      setGamesInDB();
    } else if (!localStorage.getItem("token")) {
      props.history.push("/login");
    }

    return () => {
      setGames([]);
    };
  }, [setGamesInDB, props.isLoggedIn, props.history, title]);

  return (
    <div className={classes.Search}>
      <div className={classes.SearchTitle}>Results for: '{title}'</div>

      {games?.length > 0 ? (
        <GamesCards cards={games} />
      ) : (
        <div className={classes.NoGames}>No games found for this search</div>
      )}
      <LoaderModal isLoading={isLoading} />
    </div>
  );
};

export default SearchPage;
