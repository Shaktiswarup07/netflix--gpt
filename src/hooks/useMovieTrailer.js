import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (id) => {
  const dispatch = useDispatch();
  //   console.log(movieId);
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  //fetch trailer video and update the store with trailer video data

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const trailers = json.results.filter((video) => video.type === "Trailer");
    const trailer = trailers.length ? trailers[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    if (!trailerVideo) getMovieVideos();
  }, []);
};
export default useMovieTrailer;
