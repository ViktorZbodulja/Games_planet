import axios from "axios";
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchedGameURL,
  platformFilterURL,
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
  const platformGames = await axios.get(platformFilterURL(platformId));
  dispatch({
    type: "PLATFORM_FILTER",
    payload: {
      platformUpcoming: platformGames.data.results,
    },
  });
};
