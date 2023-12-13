import React, { useEffect, useRef } from "react";
import Gamedetail from "../components/Gamedetail";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import {
  fetchPlatform,
  fetchGenre,
  fetchPublisher,
  selectPlatform,
  selectGenre,
  selectPublisher,
} from "../actions/gamesAction";
//Components
import PlatformButtons from "../components/PlatformButtons";
import GenreButtons from "../components/GenreButtons";
import PublishersButton from "../components/PublishersButton";
import GameList from "../components/GameList";
//Animation
import { useLocation } from "react-router-dom";
//header function
import { generateHeader } from "../utils/headerUtil";
//Icons
import upIcon from "../img/up_icon_1.svg";

function Home() {
  //get current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  //FETCH GAMES
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const h1Refs = [useRef(), useRef(), useRef()]; // refs for each h1 element

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // Iterating through each h1 element and updating the class
    h1Refs.forEach((h1Ref, index) => {
      const h1OffsetTop = h1Ref.current.offsetTop;

      if (scrollPosition >= h1OffsetTop) {
        // Adding fixedHeader class to the current h1
        h1Ref.current.classList.add("fixedHeader");

        // Removing the fixedHeader class from the previous h1
        if (index > 0) {
          h1Refs[index - 1].current.classList.remove("fixedHeader");
        }
      } else {
        // Remove the fixedHeader class if scrollPosition is above the h1
        h1Ref.current.classList.remove("fixedHeader");
      }
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  //https://api.rawg.io/api/publishers?search=bethesda%20Studios&key=3d47e9c894c049e0aa8a3715acbdccd6&page_size=10
  const publisherNameMap = {
    354: "Electronic Arts",
    11237: "Blizzard Entertainment",
    308: "Square Enix",
    3656: "Paradox Interactive",
    2155: "Rockstar Games",
    918: "Ubisoft Entertainment",
    3678: "Larian Studios",
    3399: "Valve",
    11687: "Sony",
    3408: "Sega",
    339: "Bethesda Softworks",
  };

  //data from the store
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
    selectedPublisher,
    publisherGames,
  } = useSelector((state) => state.games);

  //filter by platform
  const filterByPlatform = (platformId) => {
    dispatch(fetchPlatform(platformId));
    dispatch(selectPlatform(platformNameMap[platformId]));
    dispatch({ type: "CLEAR_SEARCH" });
    dispatch({ type: "CLEAR_GENRES" });
    dispatch({ type: "CLEAR_SELECTED_GENRE" });
    dispatch({ type: "CLEAR_PUBLISHER_GAME" });
  };
  const filterByGenres = (genreId) => {
    dispatch(fetchGenre(genreId));
    dispatch(selectGenre(genreNameMap[genreId]));
    dispatch({ type: "CLEAR_PLATFORMS" });
    dispatch({ type: "CLEAR_SEARCH" });
    dispatch({ type: "CLEAR_SELECTED_PLATFORM" });
    dispatch({ type: "CLEAR_PUBLISHER_GAME" });
  };
  const filteredByPublishers = (publisherId) => {
    dispatch(fetchPublisher(publisherId));
    dispatch(selectPublisher(publisherNameMap[publisherId]));
    dispatch({ type: "CLEAR_SEARCH" });
    // Scroll to the top
    const isMobile = window.innerWidth < 876;
    if (!isMobile) {
      window.scrollTo({ top: 450, behavior: "smooth" });
    }
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_PLATFORMS" });
    dispatch({ type: "CLEAR_GENRES" });
    dispatch({ type: "CLEAR_SEARCH" });
    dispatch({ type: "CLEAR_SELECTED_PLATFORM" });
    dispatch({ type: "CLEAR_SELECTED_GENRE" });
    dispatch({ type: "CLEAR_PUBLISHER_GAME" });
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
        <h2 id="publisher_header">Publishers:</h2>
        <PublishersButton filteredByPublishers={filteredByPublishers} />
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
        {publisherGames.length ? (
          <div className="searched">
            <h1 className="games_h1">
              <span className="publisher_h1">{selectedPublisher}</span> Games
            </h1>
            <GameList games={publisherGames} />
          </div>
        ) : (
          ""
        )}

        <h1 ref={h1Refs[0]} className="games_h1">
          {upcomingHeaderHandler()}
        </h1>
        <GameList games={upcomingGamesHandler()} />
        <h1 ref={h1Refs[1]} className="games_h1">
          {popularHeaderHandler()}
        </h1>
        <GameList games={popularGamesHandler()} />
        <h1 ref={h1Refs[2]} className="games_h1">
          {newHeaderHandler()}
        </h1>
        <GameList games={newGamesHandler()} />
      </div>
      <div className="btn_container">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>
          <img className="up_btn" src={upIcon} alt="Up Icon" />
        </button>
      </div>
    </div>
  );
}

export default Home;
