import classes from "./SearchButton.module.css";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchButton = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      setSearchValue("");
      props.onSearch(searchValue.trim());
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.SearchContainer}>
      <input
        autoComplete="off"
        className={classes.Input}
        type="text"
        name="search"
        onChange={onChangeHandler}
        value={searchValue}
      />
      <button className={classes.SearchButtonContainer} type="submit">
        <AiOutlineSearch className={classes.SearchButton} />
      </button>
    </form>
  );
};

export default SearchButton;
