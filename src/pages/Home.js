import React, { useEffect } from "react";
import Gamedetail from "../components/Gamedetail";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import { fetchPlatform } from "../actions/gamesAction";
//Components
import Game from "../components/Game";
//Animation
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function Home() {
  //get current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  //FETCH GAMES
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  //geting data back from the store
  const { popular, newGames, upcoming, searched, platformPopular } =
    useSelector((state) => state.games);

  //filter by platform
  const filterByPlatform = (platformId) => {
    dispatch(fetchPlatform(platformId));
  };
  //https://api.rawg.io/api/games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=2019-09-01,2019-09-30&ordering=-added&page_size=10&platform=186
  return (
    <div className="game_list">
      <button onClick={() => filterByPlatform(1)}>Play Station 5</button>
      {pathId && (
        <motion.div>
          <Gamedetail pathId={pathId} />
        </motion.div>
      )}
      {searched.length ? (
        <div className="searched">
          <h1>Searched Games</h1>
          <div className="games">
            {searched.map((game) => (
              <motion.div>
                <Game
                  name={game.name}
                  released={game.released}
                  id={game.id}
                  image={game.background_image}
                  key={game.id}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}

      <h1>Upcoming Games</h1>
      <div className="games">
        {upcoming.map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
            key={game.id}
          />
        ))}
      </div>
      <h1>Popular Games</h1>
      <div className="games">
        {(platformPopular || popular).map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
            key={game.id}
          />
        ))}
      </div>
      <h1>New Games</h1>
      <div className="games">
        {newGames.map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
            key={game.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
