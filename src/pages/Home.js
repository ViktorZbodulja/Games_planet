import React, { useEffect } from "react";
import Gamedetail from "../components/Gamedetail";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import { fetchPlatform, fetchGenre } from "../actions/gamesAction";
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
  const {
    popular,
    newGames,
    upcoming,
    searched,
    platformUpcoming,
    platformPopular,
    platformNewGames,
    genreUpcoming,
    genrePopular,
    genreNewGames,
  } = useSelector((state) => state.games);

  //filter by platform
  const filterByPlatform = (platformId) => {
    dispatch(fetchPlatform(platformId));
  };
  const filterByGenres = (genreId) => {
    dispatch(fetchGenre(genreId));
  };
  //https://api.rawg.io/api/games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=2019-09-01,2019-09-30&ordering=-added&page_size=10&platform=186
  const clearPlatforms = () => {
    dispatch({ type: "CLEAR_PLATFORMS" });
  };

  return (
    <div className="home">
      <div className="genre_container_home">
        <h2>Genres</h2>
        <button onClick={() => filterByGenres(4)}>Action</button>
        <button onClick={() => filterByGenres(3)}>Adventure</button>
        <button onClick={() => filterByGenres(5)}>RPG</button>
        <button onClick={() => filterByGenres(2)}>Shooter</button>
        <button onClick={() => filterByGenres(83)}>Platformer</button>
        <button onClick={() => filterByGenres(10)}>Strategy</button>
        <button onClick={() => filterByGenres(7)}>Puzzle</button>
        <button onClick={() => filterByGenres(51)}>Indie</button>
      </div>

      <div className="game_list">
        <div className="platforms_container">
          <h2>Platforms:</h2>
          <div className="buttons">
            <button onClick={() => clearPlatforms()}>All</button>
            <button onClick={() => filterByPlatform(187)}>
              Play Station 5
            </button>
            <button onClick={() => filterByPlatform(18)}>Play Station 4</button>
            <button onClick={() => filterByPlatform(4)}>Steam</button>
            <button onClick={() => filterByPlatform(1)}>XBOX-ONE</button>
            <button onClick={() => filterByPlatform(186)}>XBOX</button>
            <button onClick={() => filterByPlatform(7)}>Nintendo SW</button>
            <button onClick={() => filterByPlatform(5)}>macOS</button>
          </div>
        </div>
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
          {(platformUpcoming.length ? platformUpcoming : upcoming).map(
            (game) => (
              <Game
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
                key={game.id}
              />
            )
          )}
        </div>
        <h1>Popular Games</h1>
        <div className="games">
          {(platformPopular.length ? platformPopular : popular).map((game) => (
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
          {(platformNewGames.length ? platformNewGames : newGames).map(
            (game) => (
              <Game
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
                key={game.id}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
