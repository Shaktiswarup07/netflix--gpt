import React from "react";
import Header from "./components/Header";
import useNowPlayingMovies from "./hooks/useNowPlayingMovies";
import MainContainer from "./components/MainContainer";
import SecondaryContainer from "./components/SecondaryContainer";
import usePopularMovies from "./hooks/usePopularMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  return (
    <div className="bg-black">
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
