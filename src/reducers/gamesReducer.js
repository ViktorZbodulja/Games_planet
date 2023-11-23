const initState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
  platformUpcoming: [],
  platformPopular: [],
  platformNewGames: [],
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
    default:
      return { ...state };
  }
};

export default gamesReducer;
