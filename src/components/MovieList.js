import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  return (
    <div>
      <h1 className="text-xl  font-semibold mt-9 mb-1 ml-4 text-white">
        {title}
      </h1>
      <div
        className="flex overflow-x-scroll ml-4 scrollbar-hidden
      "
      >
        <div className="flex">
          {movies?.map((movie) => {
            return <MovieCard poster_path={movie.poster_path} key={movie.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
