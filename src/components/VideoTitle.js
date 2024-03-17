import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" h-full py-24 md:py-36 px-6 md:px-12 absolute bg-gradient-to-r from-black">
      <h1 className="text-3xl md:text-5xl font-bold text-yellow-400">
        {title}
      </h1>
      <p className="hidden md:inline-block w-1/2 mt-4 text-lg text-white  p-2 rounded-lg bg-opacity-5">
        {overview}
      </p>
      <div className=" mt-3 md:mt-5">
        <button className="mr-2 bg-white px-6 py-1 md:px-6 md:py-2 rounded-md hover:bg-opacity-50">
          <i className="fa-solid fa-play"></i> Play
        </button>
        <button className=" hidden md:inline-block  bg-slate-300 px-6 py-2 rounded-md hover:bg-opacity-55">
          <i class="fa-light fa-info"></i> More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
