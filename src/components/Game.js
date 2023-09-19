import React from "react";
import { motion } from "framer-motion";
//Redux
import { useDispatch } from "react-redux";
import loadDetail from "../actions/detailAction";
import { Link } from "react-router-dom";
import { resizeImage } from "../util";
//animations
import { popup } from "../animations";

function Game({ name, released, image, id }) {
  const stringPathId = id.toString();
  //Load details
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(id));
  };
  return (
    <motion.div
      className="game"
      onClick={loadDetailHandler}
      layoutId={stringPathId}
      variants={popup}
      initial="hidden"
      animate="show">
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <h4>{released}</h4>
        <motion.img
          src={resizeImage(image, 640)}
          alt={name}
          layoutId={`image ${stringPathId}`}
        />
      </Link>
    </motion.div>
  );
}

export default Game;
