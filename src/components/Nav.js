import React, { useState } from "react";
//animation
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { fadeIn } from "../animations";
//Redux and Routes
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";

function Nav() {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    setTextInput("");
  };
  const clearSearched = () => {
    dispatch({ type: "CLEAR_SEARCH" });
  };

  return (
    <motion.div
      className="nav"
      variants={fadeIn}
      initial="hidden"
      animate="show"
    >
      <div className="logo" onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h2>Games Planet</h2>
      </div>
      <form className="search">
        <input value={textInput} onChange={inputHandler} type="text" />
        <button type="submit" onClick={submitSearch}>
          Search
        </button>
      </form>
    </motion.div>
  );
}

export default Nav;
