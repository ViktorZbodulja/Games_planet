import React from "react";

function PublishersButton({ filteredByPublishers }) {
  const publishers = [
    { id: 2155, name: "Rockstar Games" },
    { id: 339, name: "Bethesda" },
    { id: 918, name: "Ubisoft" },
    { id: 3656, name: "Paradox Interactive" },
    { id: 354, name: "Electronic Arts" },
    { id: 11237, name: "Blizzard" },
    { id: 308, name: "Square Enix" },
    { id: 3678, name: "Larian Studios" },
    { id: 3399, name: "Valve" },
    { id: 11687, name: "Sony" },
    { id: 3408, name: "Sega" },
  ];

  return (
    <div className="publishers_buttons">
      {publishers.map((publisher) => (
        <button
          className="publisher_btn"
          key={publisher.id}
          onClick={() => filteredByPublishers(publisher.id)}>
          {publisher.name}
        </button>
      ))}
    </div>
  );
}

export default PublishersButton;
