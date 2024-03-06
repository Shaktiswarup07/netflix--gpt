import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" aspect-video py-36 px-12 absolute bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold text-yellow-400">{title}</h1>
      <p className="w-1/2 mt-4 text-lg text-white  p-2 rounded-lg bg-opacity-5">
        {overview}
      </p>
      <div className="mt-5">
        <button className="mr-2 bg-white px-6 py-2 rounded-md hover:bg-opacity-50">
          <i className="fa-solid fa-play"></i> Play
        </button>
        <button className="bg-slate-300 px-6 py-2 rounded-md hover:bg-opacity-55">
          <i class="fa-light fa-info"></i> More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
