import React from "react";
import Game from "./Game";

const GameList = ({ games }) => {
  return (
    <div className="games">
      {games.map((game) => (
        <Game
          key={game.id}
          name={game.name}
          released={game.released}
          id={game.id}
          image={game.background_image}
          stores={game.stores}
        />
      ))}
    </div>
  );
};

export default GameList;
