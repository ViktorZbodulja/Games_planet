import React, { useEffect, useState } from "react";
import Gamedetail from "../components/Gamedetail";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import {
  fetchPlatform,
  fetchGenre,
  selectPlatform,
  selectGenre,
} from "../actions/gamesAction";
//Components
import Game from "../components/Game";
//Animation
import { useLocation } from "react-router-dom";
//header function
import { generateHeader } from "../utils/headerUtil";

function Home() {
  //get current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  //FETCH GAMES
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const [platformNameMap, setPlatformNameMap] = useState({
    187: "Play Station 5",
    18: "Play Station 4",
    4: "Steam",
    1: "XBOX-ONE",
    186: "XBOX S/X",
    7: "Nintendo Switch",
    5: "macOS",
  });
  const [genreNameMap, SetgenreNameMap] = useState({
    4: "Action",
    3: "Adventure",
    5: "RPG",
    2: "Shooter",
    83: "Platformer",
    10: "Strategy",
    15: "Sport",
    1: "Racing",
    7: "Puzzle",
    51: "Indie",
  });

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
    selectedPlatform,
    selectedGenre,
  } = useSelector((state) => state.games);

  //filter by platform
  const filterByPlatform = (platformId) => {
    dispatch(fetchPlatform(platformId));
    dispatch(selectPlatform(platformNameMap[platformId]));
    dispatch({ type: "CLEAR_SEARCH" });
    dispatch({ type: "CLEAR_GENRES" });
    dispatch({ type: "CLEAR_SELECTED_GENRE" });
  };
  const filterByGenres = (genreId) => {
    dispatch(fetchGenre(genreId));
    dispatch(selectGenre(genreNameMap[genreId]));
    dispatch({ type: "CLEAR_PLATFORMS" });
    dispatch({ type: "CLEAR_SEARCH" });
    dispatch({ type: "CLEAR_SELECTED_PLATFORM" });
  };
  //https://api.rawg.io/api/games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=2019-09-01,2019-09-30&ordering=-added&page_size=10&platform=186
  const clearAll = () => {
    dispatch({ type: "CLEAR_PLATFORMS" });
    dispatch({ type: "CLEAR_GENRES" });
    dispatch({ type: "CLEAR_SEARCH" });
    dispatch({ type: "CLEAR_SELECTED_PLATFORM" });
    dispatch({ type: "CLEAR_SELECTED_GENRE" });
  };
  //dynamic h1
  const upcomingHeaderHandler = () => {
    return generateHeader("upcoming", selectedPlatform, selectedGenre);
  };

  const popularHeaderHandler = () => {
    return generateHeader("popular", selectedPlatform, selectedGenre);
  };

  const newHeaderHandler = () => {
    return generateHeader("new", selectedPlatform, selectedGenre);
  };
  const upcomingGamesHandler = () => {
    if (platformUpcoming.length) {
      return platformUpcoming;
    } else if (genreUpcoming.length) {
      return genreUpcoming;
    } else {
      return upcoming;
    }
  };
  const popularGamesHandler = () => {
    if (platformPopular.length) {
      return platformPopular;
    } else if (genrePopular.length) {
      return genrePopular;
    } else {
      return popular;
    }
  };
  const newGamesHandler = () => {
    if (platformNewGames.length) {
      return platformNewGames;
    } else if (genreNewGames.length) {
      return genreNewGames;
    } else {
      return newGames;
    }
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
        <button onClick={() => filterByGenres(15)}>Sport</button>
        <button onClick={() => filterByGenres(7)}>Puzzle</button>
        <button onClick={() => filterByGenres(51)}>Indie</button>
      </div>
      <div className="game_list">
        <div className="platforms_container">
          <h2>Platforms:</h2>
          <div className="buttons">
            <button onClick={() => clearAll()}>All</button>
            <button onClick={() => filterByPlatform(187)}>
              Play Station 5
            </button>
            <button onClick={() => filterByPlatform(18)}>Play Station 4</button>
            <button onClick={() => filterByPlatform(4)}>Steam</button>
            <button onClick={() => filterByPlatform(1)}>XBOX-ONE</button>
            <button onClick={() => filterByPlatform(186)}>XBOX S/X</button>
            <button onClick={() => filterByPlatform(7)}>Nintendo SW</button>
            <button onClick={() => filterByPlatform(5)}>macOS</button>
          </div>
        </div>
        {pathId && (
          <div>
            <Gamedetail pathId={pathId} />
          </div>
        )}
        {searched.length ? (
          <div className="searched">
            <h1 className="games_h1">Searched Games</h1>
            <div className="games">
              {searched.map((game) => (
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
        ) : (
          ""
        )}

        <h1 className="games_h1">{upcomingHeaderHandler()}</h1>
        <div className="games">
          {upcomingGamesHandler().map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </div>
        <h1 className="games_h1">{popularHeaderHandler()}</h1>
        <div className="games">
          {/*(platformPopular.length ? platformPopular : popular) */}
          {popularGamesHandler().map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </div>
        <h1 className="games_h1">{newHeaderHandler()}</h1>
        <div className="games">
          {newGamesHandler().map((game) => (
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
    </div>
  );
}

export default Home;
