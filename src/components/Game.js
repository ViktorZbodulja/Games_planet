import React from "react";
import { motion } from "framer-motion";
//date-fns
import { format } from "date-fns";
//Redux
import { useDispatch } from "react-redux";
import loadDetail from "../actions/detailAction";
import { Link } from "react-router-dom";
import { resizeImage } from "../utils/util";
//animations
import { popup } from "../animations";

function Game({ name, released, image, id, stores }) {
  const stringPathId = id.toString();
  //Load details
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(id));
  };
  //date format
  const releaseDate = new Date(released);
  const formattedDate = format(releaseDate, "dd.MM.yyyy");

  return (
    <motion.div
      className="game"
      onClick={loadDetailHandler}
      layoutId={stringPathId}
      variants={popup}
      initial="hidden"
      animate="show">
      <Link to={`/game/${id}`}>
        <div className="info_container">
          <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
          <h4>Release date: {formattedDate}</h4>
        </div>
        <motion.div
          className="store_container"
          layoutId={`store ${stringPathId}`}>
          {stores &&
            stores.slice(0, 3).map((store) => {
              return (
                <div className="store" key={store.store.id}>
                  {store.store.name}
                </div>
              );
            })}
        </motion.div>
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
