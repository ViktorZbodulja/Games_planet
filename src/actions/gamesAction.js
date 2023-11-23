import axios from "axios";
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchedGameURL,
  platformUpcomingURL,
  platformPopularURL,
  platformNewgamesURL,
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
