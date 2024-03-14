import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="-mt-40 relative z-10">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Upcoming movies"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Horror movies"} movies={movies.nowPlayingMovies} />
      {/* MovieList - Popular
        MovieCard*n
    MovieList - Now Playing
    MovieList - Horror */}
    </div>
  );
};

export default SecondaryContainer;
