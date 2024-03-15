import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const language = useSelector((store) => store.lang.language);
  return (
    <div className="pt-[10%] w-1/2 mx-auto ">
      <form className="text-center  grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 w-full col-span-8 rounded-lg"
          placeholder={lang[language].gptSearchPlaceholder}
        />
        <button className="py-2 px-4 mx-8 my-4 bg-red-700 text-white rounded-lg col-span-4">
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
