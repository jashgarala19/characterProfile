import React from "react";

const statusColor = {
  Alive: "bg-green",
  unknown: "bg-darkGray",
  Dead: "bg-primary",
};

const CharacterCard = ({ character }) => {
  const { gender, name, status, species, image, location, episode, type } =
    character;
  return (
    <div
      className="bg-white     rounded-xl flex flex-row 
   max:sm:h-auto w-[420px] max-sm:w-auto cursor-pointer


    max-sm:flex-col
    max-sm:flex-justify-center
    max-sm:flex-items-center
    max-sm:pt-3
    "
    >
      <img src={image} className="rounded-l-xl  max-sm:w-[200px] max-sm:m-auto max-sm:rounded-none max-sm:cover" width={140} />
      <div className="p-3 gap-1 flex-col justify-center flex max-sm:items-center">
        <p className="font-bold text-xl text-darkGray">{name}</p>
        <div className="flex items-center gap-1">
          <p
            className={`font-medium  text-sm  ${statusColor[status]} px-2 text-white`}
          >
            {status.toUpperCase()}{" "}
          </p>
          <p>-</p>
          <p className="font-semibold text-sm text-darkGray">{species}</p>
        </div>
        <p className="font-semibold text-sm text-darkGray whitespace-pre-line">
          Last known Location - {location?.name}
        </p>

        <p className="font-semibold text-sm text-darkGray">Gender - {gender}</p>
        <p className="font-semibold text-sm text-darkGray">
          Type - {!type ? "No Type" : type}
        </p>

        <p className="font-semibold text-sm text-darkGray">
          Episodes - {episode?.length}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
