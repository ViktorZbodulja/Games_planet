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
const getCurrentDay = (offset = 0) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - offset);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
};
//Current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDate = getCurrentDay();

const lastYear = `${currentYear - 1}-${currentMonth}-01`;
const nextYear = `${currentYear + 1}-${currentMonth}-01`;

const prevDate = getCurrentDay(2);
console.log(currentDate);
console.log(lastYear);
console.log(nextYear);

//Popular games
//Fetching from last year to current date
const upcoming_games = `games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${currentDate},${nextYear}&ordering=-added&`;
const popular_games = `games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${lastYear},${currentDate}&ordering=-metacritic&`;
const new_games = `games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${lastYear},${prevDate}&ordering=-released&`;
//released

export const upcomingGamesURL = (numberOfGames) =>
  `${base_url}${upcoming_games}page_size=${numberOfGames}`;

export const popularGamesURL = (numberOfGames) =>
  `${base_url}${popular_games}page_size=${numberOfGames}`;

export const newGamesURL = () => `${base_url}${new_games}page_size=16`;

//GAME DETAILS
export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}.json?&key=3d47e9c894c049e0aa8a3715acbdccd6`;
//Game screenshots
export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?&key=3d47e9c894c049e0aa8a3715acbdccd6`;
//Searched Game
export const searchedGameURL = (game_name) =>
  `${base_url}games?key=3d47e9c894c049e0aa8a3715acbdccd6&search=${game_name}&ordering=-added&page_size=12`;

//platform filters
export const platformUpcomingURL = (platformId, numberOfGames) =>
  `${base_url}games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${currentDate},${nextYear}&ordering=-added&page_size=${numberOfGames}&platforms=${platformId}`;

export const platformPopularURL = (platformId) =>
  `${base_url}${popular_games}&platforms=${platformId}`;

export const platformNewgamesURL = (platformId) =>
  `${base_url}${new_games}&platforms=${platformId}`;

//genre filters
export const genreUpcomingURL = (genreId, numberOfGames) =>
  `${base_url}games?key=3d47e9c894c049e0aa8a3715acbdccd6&dates=${currentDate},${nextYear}&ordering=-added&page_size=${numberOfGames}&genres=${genreId}`;

export const genrePopularURL = (genreId) =>
  `${base_url}${popular_games}&genres=${genreId}`;

export const genreNewgamesURL = (genreId) =>
  `${base_url}${new_games}&genres=${genreId}`;

//publisher filter
export const publisherGamesURL = (publisherId, numberOfGames) =>
  `${base_url}games?ordering=-metacritic&publishers=${publisherId}&key=3d47e9c894c049e0aa8a3715acbdccd6&page_size=${numberOfGames}`;

//https://api.rawg.io/api/games?ordering=-rating&developers=109
