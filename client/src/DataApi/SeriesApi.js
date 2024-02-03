import http from "../http-common.function";

const fetchIndiaSeriesList = async () => {
  try {
    let res = await http.get(`/contents/getindiamov`);

    if (res.status === 200) {
      const onlyMovieList = res.data.data.filter(
        (movie) => movie.section === "movie"
      );

      return onlyMovieList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const fetchUpcomingList = async () => {
  try {
    let res = await http.get(`/contents/getupcomingamov`);
    const onlyMovieList = res.data.data.filter(
      (movie) => movie.section === "movie"
    );

    if (res.status === 200) {
      return onlyMovieList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const fetchTrendingList = async () => {
  try {
    let res = await http.get(`/contents/gettrendingamov`);
    const onlyMovieList = res.data.data.filter(
      (movie) => movie.section === "movie"
    );
    if (res.status === 200) {
      return onlyMovieList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const SeriesPageService = {
  fetchIndiaSeriesList,
  fetchUpcomingList,
  fetchTrendingList,
};

export default SeriesPageService;
