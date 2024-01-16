import Loader from "components/Loader/Loader";
import useApiData, { ApiResponse } from "hooks/useApiData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const statusColor: Record<string, string> = {
  Alive: "bg-green",
  unknown: "bg-gray",
  Dead: "bg-primary",
};

const CharacterText = ({ text, value }) => {
  return (
    <>
      <span className="flex gap-2 items-center  max-sm:gap-1 max-sm:justify-start max-sm:flex-1 flex-wrap max-sm:flex-col">
        <p className="font-semibold text-lg max-sm:text-sm text-white max-sm:bg-primary max-sm:px-10 max-sm:py-1">
          {text}
        </p>

        <p className="font-semibold text-lg text-white  max-sm:text-sm max-sm:hidden">
          {" "}
          -{" "}
        </p>
        <p className="font-semibold text-lg text-white  max-sm:text-sm">
          {value}
        </p>
      </span>
    </>
  );
};
const CharacterPage = () => {
  const { characterId } = useParams();
  //   const [characerData, setCharacterData] = useState([]);
  const { data, loading, error, refetch }: ApiResponse = useApiData(
    `character/${characterId}`
  );
  const {
    gender,
    name,
    status,
    species,
    image,
    location,
    episode,
    type,
    id,
    origin,
  } = data;
  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="w-full min-h-[calc(100vh_-_220px)] flex flex-1 justify-center items-center">
        <h2 className="text-primary text-4xl max-sm:text-sm">{error}!!</h2>
      </div>
    );
  }

  return (
    <div className="p-5 relative  ">
      <div className=" mx-auto max-w-[80rem]   min-h-[calc(100vh_-_110px)] flex flex-col justify-center ">
        <div className=" flex gap-3 flex-row max-sm:flex-col bg-primary   ">
          <div className="   p-10 flex justify-center items-center flex-col gap-2">
            <div className="border-4 bg-white border-darkGray  p-3">
              <img src={image} style={{ width: "300px", height: "300px" }} />
            </div>
          </div>

          <div className=" flex-1 border-8  bg-darkGray border-primary flex-col flex  px-10 py-2 gap-6  ">
            <p className="font-bold text-3xl text-white text-center max-sm:text-lg">
              - {name} -
            </p>
            <div className="flex flex-col flex-1 gap-4  ">
              {/* <p
                className={`font-medium text-sm ${statusColor[status]} px-10 text-white inline-block w-max max-sm:m-auto`}
              >
                {status?.toUpperCase()}{" "}
              </p> */}
              <CharacterText text="Status" value={status?.toUpperCase()} />
              <CharacterText text="Species" value={species} />
              <CharacterText
                text="Last known Location"
                value={location?.name}
              />

              <CharacterText text="Gender" value={gender} />
              <CharacterText text="Type" value={!type ? "No Type" : type} />
              <CharacterText text="Origin" value={origin?.name} />
              <CharacterText text="Total Episodes" value={episode?.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
