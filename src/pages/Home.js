import React, { useEffect, useRef, useState } from "react";
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
import Game from "../components/Game";
//Animation
import { useLocation } from "react-router-dom";
//header function
import { generateHeader } from "../utils/headerUtil";
//Icons
import upIcon from "../img/up_icon_1.svg";
//Splide components
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Home() {
  //get current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  //FETCH GAMES
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  {
    /*   //dynamic h1 on scroll
  const h1Refs = [useRef(), useRef(), useRef()]; // refs for each h1 element
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

 const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const currentScreenWidth = window.innerWidth;

    if (currentScreenWidth > 768) {
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
          // Removing the fixedHeader class if scrollPosition is above the h1
          h1Ref.current.classList.remove("fixedHeader");
        }
      });
    } else {
      // Removing the fixedHeader class from all h1 elements if screen width is <= 768
      h1Refs.forEach((h1Ref) => {
        h1Ref.current.classList.remove("fixedHeader");
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth)); // Update screenWidth on resize
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () =>
        setScreenWidth(window.innerWidth)
      );
    };
  }, [handleScroll, screenWidth]); */
  }

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
    inputText,
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
    setNumberOfUpcomingGames(12);
    setNumberOfPopularGames(12);
    setNumberOfPublisherGames(12);
  };
  const filterByGenres = (genreId) => {
    dispatch(fetchGenre(genreId));
    dispatch(selectGenre(genreNameMap[genreId]));
    dispatch({ type: "CLEAR_PLATFORMS" });
    dispatch({ type: "CLEAR_SEARCH" });
    dispatch({ type: "CLEAR_SELECTED_PLATFORM" });
    dispatch({ type: "CLEAR_PUBLISHER_GAME" });
    setNumberOfUpcomingGames(12);
    setNumberOfPopularGames(12);
    setNumberOfPublisherGames(12);
  };
  const filteredByPublishers = (publisherId) => {
    dispatch(fetchPublisher(publisherId));
    dispatch(selectPublisher(publisherNameMap[publisherId]));
    dispatch({ type: "CLEAR_SEARCH" });
    setNumberOfUpcomingGames(12);
    setNumberOfPopularGames(12);
    setNumberOfPublisherGames(12);
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
    setNumberOfUpcomingGames(12);
    setNumberOfPopularGames(12);
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

  const [numberOfUpcomingGames, setNumberOfUpcomingGames] = useState(12);
  const [numberOfPopularGames, setNumberOfPopularGames] = useState(12);
  const [numberOfPublisherGames, setNumberOfPublisherGames] = useState(12);

  const showMoreUpcoming = () => {
    setNumberOfUpcomingGames((prevNum) => prevNum + 4);
  };
  const showMorePopular = () => {
    setNumberOfPopularGames((prevNum) => prevNum + 4);
  };
  const showMorePublisherGames = () => {
    setNumberOfPublisherGames((prevNum) => prevNum + 4);
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
            <h1 className="games_h1">
              Searched <span className="searched_h1">"{inputText}"</span>
            </h1>
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
            <GameList games={publisherGames.slice(0, numberOfPublisherGames)} />
            <div className="show_more_container">
              {publisherGames.length && (
                <button
                  className="show_more_btn"
                  onClick={showMorePublisherGames}>
                  Show more
                </button>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        <h1 className={`games_h1`}>{upcomingHeaderHandler()}</h1>
        <GameList
          games={upcomingGamesHandler().slice(0, numberOfUpcomingGames)}
        />
        <div className="show_more_container">
          {upcoming.length && (
            <button className="show_more_btn" onClick={showMoreUpcoming}>
              Show more
            </button>
          )}
        </div>
        <h1 className={`games_h1 popular_games_h1`}>
          {popularHeaderHandler()}
        </h1>
        <GameList
          games={popularGamesHandler().slice(0, numberOfPopularGames)}
        />
        <div className="show_more_container">
          {popular.length && (
            <button className="show_more_btn" onClick={showMorePopular}>
              Show more
            </button>
          )}
        </div>
        <h1 className={`games_h1 new_games_h1`}>{newHeaderHandler()}</h1>
        <div className="splide_container">
          <Splide
            options={{
              type: "slide",
              //perPage: 4,
              focus: "center",
              arrows: true,
              pagination: true,
              autoplay: 3000,
              gap: 30,
              breakpoints: {
                600: {
                  perPage: 1,
                },
                992: {
                  perPage: 2,
                },
                1500: {
                  perPage: 3,
                },
                1920: {
                  perPage: 3,
                },
              },
            }}
            className="splide">
            {newGamesHandler()
              .slice(0, 16)
              .map((game) => (
                <SplideSlide key={game.id}>
                  {/* Render your game component here */}
                  <Game
                    name={game.name}
                    released={game.released}
                    id={game.id}
                    image={game.background_image}
                    stores={game.stores}
                  />
                </SplideSlide>
              ))}
          </Splide>
        </div>
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
