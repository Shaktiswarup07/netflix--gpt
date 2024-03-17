import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ poster_path }) => {
  if (!poster_path) return null;
  return (
    <div className="w-44 mx-1">
      <img alt="movie card" src={IMG_CDN + poster_path} />
    </div>
  );
};

export default MovieCard;
