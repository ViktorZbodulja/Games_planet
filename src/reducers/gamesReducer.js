const initState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
  platformUpcoming: [],
  platformPopular: [],
  platformNewGames: [],
  genreUpcoming: [],
  genrePopular: [],
  genreNewGames: [],
  selectedPlatform: null,
  selectedGenre: null,
};

const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames,
      };
    case "FETCH_SEARCHED":
      return {
        ...state,
        searched: action.payload.searched,
      };
    case "PLATFORM_FILTER":
      return {
        ...state,
        platformUpcoming: action.payload.platformUpcoming,
        platformPopular: action.payload.platformPopular,
        platformNewGames: action.payload.platformNewGames,
      };
    case "GENRE_FILTER":
      return {
        ...state,
        genreUpcoming: action.payload.genreUpcoming,
        genrePopular: action.payload.genrePopular,
        genreNewGames: action.payload.genreNewGames,
      };
    case "SELECT_PLATFORM":
      return {
        ...state,
        selectedPlatform: action.payload,
      };
    case "SELECT_GENRE":
      return {
        ...state,
        selectedGenre: action.payload,
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        searched: [],
      };
    case "CLEAR_PLATFORMS":
      return {
        ...state,
        platformUpcoming: [],
        platformPopular: [],
        platformNewGames: [],
      };
    case "CLEAR_GENRES":
      return {
        ...state,
        genreUpcoming: [],
        genrePopular: [],
        genreNewGames: [],
      };
    case "CLEAR_SELECTED_PLATFORM":
      return {
        ...state,
        selectedPlatform: null,
      };
    case "CLEAR_SELECTED_GENRE":
      return {
        ...state,
        selectedGenre: null,
      };

    default:
      return { ...state };
  }
};

export default gamesReducer;
