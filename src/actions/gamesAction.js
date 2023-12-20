import axios from "axios";
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchedGameURL,
  platformUpcomingURL,
  platformPopularURL,
  platformNewgamesURL,
  genreUpcomingURL,
  genrePopularURL,
  genreNewgamesURL,
  publisherGamesURL,
} from "../api";

//ACTION CREATOR
export const loadGames = () => async (dispatch) => {
  //fetch axios
  const popularData = await axios.get(popularGamesURL());
  const newGamesData = await axios.get(newGamesURL());
  const upcomingData = await axios.get(upcomingGamesURL());
  dispatch({
    type: "FETCH_GAMES",
    payload: {
      popular: popularData.data.results,
      upcoming: upcomingData.data.results,
      newGames: newGamesData.data.results,
    },
  });
};
export const fetchSearch = (game_name) => async (dispatch) => {
  const searchGames = await axios.get(searchedGameURL(game_name));
  dispatch({
    type: "FETCH_SEARCHED",
    payload: {
      searched: searchGames.data.results,
    },
  });
};
export const fetchPlatform = (platformId) => async (dispatch) => {
  const platformUpcoming = await axios.get(platformUpcomingURL(platformId));
  const platformPopular = await axios.get(platformPopularURL(platformId));
  const platformNew = await axios.get(platformNewgamesURL(platformId));
  dispatch({
    type: "PLATFORM_FILTER",
    payload: {
      platformUpcoming: platformUpcoming.data.results,
      platformPopular: platformPopular.data.results,
      platformNewGames: platformNew.data.results,
    },
  });
};
export const fetchGenre = (genreId) => async (dispatch) => {
  const genreUpcoming = await axios.get(genreUpcomingURL(genreId));
  const genrePopular = await axios.get(genrePopularURL(genreId));
  const genreNew = await axios.get(genreNewgamesURL(genreId));
  dispatch({
    type: "GENRE_FILTER",
    payload: {
      genreUpcoming: genreUpcoming.data.results,
      genrePopular: genrePopular.data.results,
      genreNewGames: genreNew.data.results,
    },
  });
};
export const fetchPublisher = (publisherId) => async (dispatch) => {
  const publisherGames = await axios.get(publisherGamesURL(publisherId));
  dispatch({
    type: "PUBLISHER_FILTER",
    payload: {
      publisherGames: publisherGames.data.results,
    },
  });
};

export const selectPlatform = (platformName) => ({
  type: "SELECT_PLATFORM",
  payload: platformName,
});
export const selectGenre = (genreName) => ({
  type: "SELECT_GENRE",
  payload: genreName,
});
export const selectPublisher = (publisherName) => ({
  type: "SELECT_PUBLISHER",
  payload: publisherName,
});
export const searchedText = (inputText) => ({
  type: "INPUT_TEXT",
  payload: inputText,
});
