import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
  return (
    <>
      <div>
        <img
          className=" h-screen object-cover md:w-screen fixed bg-repeat-y -z-10"
          src={BG_URL}
          alt="n-logo"
        />
      </div>
      <div className="bg-black bg-opacity-70 ">
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </>
  );
};

export default GPTSearch;
