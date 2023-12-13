import React from "react";

const GenreButtons = ({ filterByGenres }) => {
  const genres = [
    { id: 3, name: "Adventure" },
    { id: 4, name: "Action" },
    { id: 5, name: "RPG" },
    { id: 2, name: "Shooter" },
    { id: 83, name: "Platformer" },
    { id: 10, name: "Strategy" },
    { id: 15, name: "Sport" },
    /*{ id: 1, name: "Racing" },*/
    { id: 7, name: "Puzzle" },
    { id: 51, name: "Indie" },
  ];

  return (
    <div className="genre-buttons">
      {genres.map((genre) => (
        <button key={genre.id} onClick={() => filterByGenres(genre.id)}>
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreButtons;
