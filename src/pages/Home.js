import React, { useEffect } from "react";
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
import PlatformButtons from "../components/PlatformButtons";
import GenreButtons from "../components/GenreButtons";
import GameList from "../components/GameList";
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

  const platformNameMap = {
    187: "Play Station 5",
    18: "Play Station 4",
    4: "Steam",
    1: "XBOX-ONE",
    186: "XBOX S/X",
    7: "Nintendo Switch",
    5: "macOS",
  };
  const genreNameMap = {
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
  };

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
        <GenreButtons filterByGenres={filterByGenres} />
      </div>
      <div className="game_list">
        <div className="platforms_container">
          <h2>Platforms:</h2>
          <PlatformButtons
            filterByPlatform={filterByPlatform}
            clearAll={clearAll}
          />
        </div>
        {pathId && <Gamedetail pathId={pathId} />}
        {searched.length ? (
          <div className="searched">
            <h1 className="games_h1">Searched Games</h1>
            <GameList games={searched} />
          </div>
        ) : (
          ""
        )}

        <h1 className="games_h1">{upcomingHeaderHandler()}</h1>
        <GameList games={upcomingGamesHandler()} />
        <h1 className="games_h1">{popularHeaderHandler()}</h1>
        <GameList games={popularGamesHandler()} />
        <h1 className="games_h1">{newHeaderHandler()}</h1>
        <GameList games={newGamesHandler()} />
      </div>
    </div>
  );
}

export default Home;
