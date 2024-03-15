import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div className=" ">
      <div>
        <img className="absolute -z-10" src={BG_URL} alt="n-logo" />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
