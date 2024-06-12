import http from "../http-common.function";

const fetchContentsListSeries = async () => {
  try {
    let listOfMovie = await http.get(`/contents/getdata`);

    if (listOfMovie.status === 200) {
      const onlyMovieList = listOfMovie.data.data.filter(
        (movie) => movie.section === "series"
      );
      return onlyMovieList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const fetchEpisodes = async () => {
  try {
    let Episodes = await http.get(`/episodes/getdata`);
    if (Episodes.status === 200) {
      return Episodes.data;
    }
  } catch (error) {
    // console.error("Error fetching trending list:", error);
  }
};

const fetchIndiaSeriesList = async () => {
  try {
    let res = await http.get(`/contents/getindiamov`);

    if (res.status === 200) {
      const onlyseriesList = res.data.data.filter(
        (series) => series.section === "series"
      );

      return onlyseriesList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const fetchUpcomingListSeries = async () => {
  try {
    let res = await http.get(`/contents/getupcomingamov`);
    const onlyseriesList = res.data.data.filter(
      (series) => series.section === "series"
    );

    if (res.status === 200) {
      return onlyseriesList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const fetchTrendingListSeries = async () => {
  try {
    let res = await http.get(`/contents/gettrendingamov`);
    const onlyseriesList = res.data.data.filter(
      (series) => series.section === "series"
    );
    if (res.status === 200) {
      return onlyseriesList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const getLatestreleasedSeries = async () => {
  try {
    let res = await http.get(`/contents/latestreleased`);
    const onlyMovieList = res.data.content.filter(
      (movie) => movie.section === "series"
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
  fetchUpcomingListSeries,
  fetchTrendingListSeries,
  getLatestreleasedSeries,
  fetchContentsListSeries,
  fetchEpisodes,
};

export default SeriesPageService;
