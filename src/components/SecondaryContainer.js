import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black">
      <div className="-mt-12 md:-mt-52 relative z-10">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />

        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming movies"} movies={movies.upcomingMovies} />
        <MovieList title={"Horror movies"} movies={movies.nowPlayingMovies} />
      </div>
      {/* MovieList - Popular
        MovieCard*n
    MovieList - Now Playing
    MovieList - Horror */}
    </div>
  );
};

export default SecondaryContainer;
