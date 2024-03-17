import React, { useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, GEMINI_API_KEY } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  console.log(GEMINI_API_KEY);
  // console.log(OPENAI_GPT_KEY);
  const language = useSelector((store) => store.lang.language);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCMyTlnq_21bhRijbxIyM7msEKTCcerg28"
  );

  const searchMovieTMDB = async (movie) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await response.json();

    return json.results;
  };

  const handleGPTSearchClick = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query : " +
      searchText +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example result: Gadar, Sholay, Don, MS Dhoni: The Untold Story, Koi Mil Gaya";

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = gptQuery;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    // console.log(response);
    // if (!chatCompletion.choices) {
    //   //TODO : Write error handling
    // }
    const gptMovies = text.split(", ");
    // //for each movie search the tmdb api
    // const mov = ["Golmaal", "Don"];
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGPTMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  return (
    <div className="pt-[45%] md:pt-[10%] w-full md:w-1/2 mx-auto  ">
      <form
        className="text-center  grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-4 m-4 w-full col-span-7 rounded-lg"
          placeholder={lang[language].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-2 mx-8 my-4 bg-red-700 text-white rounded-lg col-span-5"
          onClick={handleGPTSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
