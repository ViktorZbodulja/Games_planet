//Base URL
const base_url = "https://api.rawg.io/api/";

//Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};
const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};
//Current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 2}-${currentMonth}-${currentDay}`;

//Popular games
//Fetching from last year to current date
const upcoming_games = `games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const popular_games = `games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${lastYear},${currentDate}&ordering=-metacritic&page_size=10`;
const new_games = `games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;
//released
export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const newGamesURL = () => `${base_url}${new_games}`;
//GAME DETAILS
export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}.json?&key=3d47e9c894c049e0aa8a3715acbdccd6`;
//Game screenshots
export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?&key=3d47e9c894c049e0aa8a3715acbdccd6`;
//Searched Game
export const searchedGameURL = (game_name) =>
  `${base_url}games?key=3d47e9c894c049e0aa8a3715acbdccd6&search=${game_name}&ordering=-added&page_size=10`;

//platform filters
export const platformUpcomingURL = (platformId) =>
  `${base_url}games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${currentDate},${nextYear}&ordering=-added&page_size=10&platforms=${platformId}`;

export const platformPopularURL = (platformId) =>
  `${base_url}${popular_games}&platforms=${platformId}`;

export const platformNewgamesURL = (platformId) =>
  `${base_url}${new_games}&platforms=${platformId}`;

//genre filters
export const genreUpcomingURL = (genreId) =>
  `${base_url}games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${currentDate},${nextYear}&ordering=-added&page_size=10&genres=${genreId}`;

export const genrePopularURL = (genreId) =>
  `${base_url}${popular_games}&genres=${genreId}`;

export const genreNewgamesURL = (genreId) =>
  `${base_url}${new_games}&genres=${genreId}`;

export const publisherGamesURL = (publisherId) =>
  `${base_url}games?ordering=-metacritic&publishers=${publisherId}&key=3d47e9c894c049e0aa8a3715acbdccd6&page_size=10`;

//https://api.rawg.io/api/games?ordering=-rating&developers=109
