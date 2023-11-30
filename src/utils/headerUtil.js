export function generateHeader(category, selectedPlatform, selectedGenre) {
  let baseHeader = "";
  let specificHeader = "";

  if (selectedPlatform) {
    specificHeader = `${selectedPlatform} - `;
  } else if (selectedGenre) {
    specificHeader = `${selectedGenre} - `;
  }

  switch (category) {
    case "upcoming":
      baseHeader = "Upcoming Games";
      break;
    case "popular":
      baseHeader = "Popular Games";
      break;
    case "new":
      baseHeader = "New Games";
      break;
    default:
      baseHeader = "Games";
      break;
  }

  return `${specificHeader}${baseHeader}`;
}
