import React from "react";
import { motion } from "framer-motion";
//Redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resizeImage } from "../util";
//Images
import playstation5 from "../img/playstation5.svg";
import playstation4 from "../img/playstation4.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import xboxone from "../img/xboxone.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

function Gamedetail({ pathId }) {
  const navigate = useNavigate();
  //Exit detail
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  };
  //Get platform images
  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation4;
      case "PlayStation 5":
        return playstation5;
      case "Xbox Series S/X":
        return xbox;
      case "Xbox S":
        return xbox;
      case "Xbox One":
        return xboxone;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };
  const getStars = () => {
    const stars = [];
    const rating = Math.round(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull} />);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty} />);
      }
    }
    return stars;
  };

  //Data
  const { game, screen, isLoading } = useSelector((state) => state.detail);

  return (
    <>
      {!isLoading && (
        <div className="card_shadow shadow" onClick={exitDetailHandler}>
          <motion.div className="detail" layoutId={pathId}>
            <div className="stats">
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <div>
                  {game.publishers && game.publishers.length > 0 && (
                    <h4>{game.publishers[0].name}</h4>
                  )}
                </div>
                <div className="rating_container">
                  {getStars()}
                  <p>({game.rating})</p>
                </div>
                <div className="genre_container">
                  {game.genres.map((genre, index) => (
                    <div className="genre" key={index}>
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="info">
                <h3>Platforms</h3>
                <div className="platforms">
                  {game.platforms?.map((platform) => (
                    <img
                      key={platform.platform.id}
                      src={getPlatform(platform.platform.name)}
                      alt={platform.platform.name}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="media">
              <motion.img
                src={resizeImage(game.background_image, 1280)}
                alt={game.background_image}
                layoutId={`image ${pathId}`}
              />
            </div>
            <div className="description">
              <p>{game.description_raw}</p>
            </div>
            <div className="gallery">
              {screen.results?.map((screen) => (
                <img
                  src={resizeImage(screen.image, 1280)}
                  key={screen.id}
                  alt={screen.image}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Gamedetail;
