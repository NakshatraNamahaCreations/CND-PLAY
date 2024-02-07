import http from "../http-common.function";

const fetchContentsListmusics = async () => {
  try {
    let listOfMovie = await http.get(`/contents/getdata`);

    if (listOfMovie.status === 200) {
      const onlyMovieList = listOfMovie.data.data.filter(
        (movie) => movie.section === "musics"
      );
      return onlyMovieList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const fetchIndiamusicsList = async () => {
  try {
    let res = await http.get(`/contents/getindiamov`);

    if (res.status === 200) {
      const onlymusicsList = res.data.data.filter(
        (musics) => musics.section === "musics"
      );

      return onlymusicsList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const fetchUpcomingListmusics = async () => {
  try {
    let res = await http.get(`/contents/getupcomingamov`);
    const onlymusicsList = res.data.data.filter(
      (musics) => musics.section === "musics"
    );

    if (res.status === 200) {
      return onlymusicsList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const fetchTrendingListmusics = async () => {
  try {
    let res = await http.get(`/contents/gettrendingamov`);
    const onlymusicsList = res.data.data.filter(
      (musics) => musics.section === "musics"
    );
    if (res.status === 200) {
      return onlymusicsList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const getLatestreleasedmusics = async () => {
  try {
    let res = await http.get(`/contents/latestreleased`);
    const onlyMovieList = res.data.content.filter(
      (movie) => movie.section === "musics"
    );
    if (res.status === 200) {
      return onlyMovieList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const musicsPageService = {
  fetchIndiamusicsList,
  fetchUpcomingListmusics,
  fetchTrendingListmusics,
  getLatestreleasedmusics,
  fetchContentsListmusics,
};

export default musicsPageService;
