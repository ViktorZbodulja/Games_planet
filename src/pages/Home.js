import React, { useEffect } from "react";
import Gamedetail from "../components/Gamedetail";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
//Components
import Game from "../components/Game";
//Animation
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { fadeIn } from "../animations";

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
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );
  return (
    <div className="game_list">
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
        {popular.map((game) => (
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
