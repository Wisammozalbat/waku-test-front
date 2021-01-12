import React, { useEffect, useState, useCallback } from "react";
import LoaderModal from "../Loader/Loader";
import classes from "./Deals.module.css";
import { request } from "../../petitions/petitions";

const Deals = (props) => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDeals = useCallback(async () => {
    const response = await request(
      `deals`,
      "GET",
      {},
      localStorage.getItem("token")
    );

    if (response.data.status === 200) {
      setDeals(response.data.deals);
    } else if (response.data.status === 403) {
      props.history.push("/login");
    }
  }, [setDeals, props.history]);

  const setDealsInDB = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await request(
        `deals`,
        "POST",
        {},
        localStorage.getItem("token")
      );

      if (response.data.status === 200) {
        getDeals();
      } else if (response.data.status === 403) {
        props.history.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [getDeals, props.history]);

  const sortBy = (param, dir) => {
    let aux = [...deals?.map((deal) => ({ ...deal }))];

    aux = aux?.sort((a, b) => {
      if (dir === "asc") {
        return a[param] > b[param] ? 1 : -1;
      }
      return a[param] < b[param] ? 1 : -1;
    });

    setDeals([...aux?.map((deal) => ({ ...deal }))]);
  };

  useEffect(() => {
    if (props.isLoggedIn && localStorage.getItem("token")) {
      setDealsInDB();
    } else if (!localStorage.getItem("token")) {
      props.history.push("/login");
    }

    return () => {
      setDeals([]);
    };
  }, [setDealsInDB, props.isLoggedIn, props.history]);

  return (
    <div className={classes.Deals}>
      <div className={classes.DealsTitle}>Latest Deals</div>
      <div className={classes.FilterOptions}>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("title", "asc")}
        >
          A-Z
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("title", "desc")}
        >
          Z-A
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("salePrice", "asc")}
        >
          Lowest Price
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("salePrice", "desc")}
        >
          Highest Price
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("metacriticScore", "asc")}
        >
          Lowest Metacritic Score
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("metacriticScore", "desc")}
        >
          Highest Metacritic Score
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("steamRatingCount", "asc")}
        >
          Lowest Steam Rates
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("steamRatingCount", "desc")}
        >
          Highest Steam Rates
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("steamRatingPercent", "asc")}
        >
          Lowest Steam Score
        </div>
        <div
          className={classes.FilterOption}
          onClick={() => sortBy("steamRatingPercent", "desc")}
        >
          Highest Steam Score
        </div>
      </div>
      <div className={classes.DealsContainer}>
        {deals?.map((deal) => {
          return (
            <a
              href={`http://store.steampowered.com/app/${deal.steamAppID}/`}
              target="_blank"
              rel="noreferrer"
              className={classes.DealContainer}
              key={deal._id}
            >
              <div className={classes.ImageContainer}>
                <img
                  className={classes.Image}
                  src={deal.thumb}
                  alt="Deal hHumb"
                />
              </div>
              <div className={classes.Description}>
                <div className={classes.Title}>{deal.title}</div>
                <div className={classes.Prices}>
                  Price:
                  <div className={classes.NormalPrice}>${deal.normalPrice}</div>
                  <div className={classes.CurrentPrice}>${deal.salePrice}</div>
                </div>
                <div>
                  Metacritic score:{" "}
                  {deal.metacriticScore > 0
                    ? deal.metacriticScore + "/100"
                    : "No info"}
                </div>
                {deal.steamRatingPercent ? (
                  <div>
                    Steam Rates: {deal.steamRatingCount}. Score:{" "}
                    {deal.steamRatingPercent}%
                  </div>
                ) : (
                  "Steam Rates: No info"
                )}
                <div>
                  Review:{" "}
                  {deal.steamRatingText
                    ? deal.steamRatingText
                    : "No info available"}
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <LoaderModal isLoading={isLoading} />
    </div>
  );
};

export default Deals;
