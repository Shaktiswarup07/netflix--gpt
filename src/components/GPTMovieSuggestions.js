import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const GPTMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  if (!movieNames) return null;
  return (
    <div className="p-4 text-white ">
      {movieResults.map((movie, i) => {
        if (movie[0].poster_path)
          return (
            <MovieList
              title={movieNames[i]}
              movies={movie}
              key={movieNames[i]}
            />
          );
      })}
    </div>
  );
};

export default GPTMovieSuggestions;
