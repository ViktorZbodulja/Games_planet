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

  //for mobile
  const isMobile = window.innerWidth < 768;

  return (
    <Link to={`/game/${id}`}>
      {isMobile ? (
        // If on mobile, no motion animation
        <div className="game" onClick={loadDetailHandler}>
          <div className="info_container">
            <h3>{name}</h3>
            <h4>Release date: {formattedDate}</h4>
          </div>
          <div className="store_container">
            {stores &&
              stores.slice(0, 3).map((store) => (
                <div className="store" key={store.store.id}>
                  {store.store.name}
                </div>
              ))}
          </div>
          <img src={resizeImage(image, 640)} alt={name} />
        </div>
      ) : (
        // If not on mobile
        <motion.div
          className="game"
          onClick={loadDetailHandler}
          layoutId={stringPathId}
          variants={popup}
          initial="hidden"
          animate="show">
          <div className="info_container">
            <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
            <h4>Release date: {formattedDate}</h4>
          </div>
          <motion.div
            className="store_container"
            layoutId={`store ${stringPathId}`}>
            {stores &&
              stores.slice(0, 3).map((store) => (
                <div className="store" key={store.store.id}>
                  {store.store.name}
                </div>
              ))}
          </motion.div>
          <motion.img
            src={resizeImage(image, 640)}
            alt={name}
            layoutId={`image ${stringPathId}`}
          />
        </motion.div>
      )}
    </Link>
  );
}

export default Game;
