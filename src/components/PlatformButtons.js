import React from "react";

const PlatformButtons = ({ filterByPlatform, clearAll }) => {
  const platforms = [
    { id: 187, name: "Play Station 5" },
    { id: 18, name: "Play Station 4" },
    { id: 4, name: "Steam" },
    { id: 1, name: "XBOX-ONE" },
    { id: 186, name: "XBOX S/X" },
    { id: 7, name: "Nintendo Sw" },
    { id: 5, name: "macOS" },
  ];

  return (
    <div className="platform_buttons">
      <button onClick={clearAll}>All</button>
      {platforms.map((platform) => (
        <button key={platform.id} onClick={() => filterByPlatform(platform.id)}>
          {platform.name}
        </button>
      ))}
    </div>
  );
};

export default PlatformButtons;
