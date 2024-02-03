import http from "../http-common.function";
let authResponseString = localStorage.getItem("auth_response");
let getlocalStorage = JSON.parse(authResponseString);
const fetchContentsList = async () => {
  try {
    let listOfMovie = await http.get(`/contents/getdata`);

    if (listOfMovie.status === 200) {
      const onlyMovieList = listOfMovie.data.data.filter(
        (movie) => movie.section === "movie"
      );
      return onlyMovieList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const getByContenId = async (idd) => {
  try {
    let listOfMovie = await http.get(`/contents/getbycontentid/:${idd}`);

    if (listOfMovie.status === 200) {
      return listOfMovie;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const fetchMostViewList = async () => {
  try {
    let mostViewedMovies = await http.get(`/contents/mostViewedMovies`);

    if (mostViewedMovies.status === 200) {
      return mostViewedMovies.data.movies;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const postViews = async (itemid) => {
  try {
    let mostViewedMovies = await http.post(
      `/contents/incrementViews/${itemid}`
    );

    if (mostViewedMovies.status === 200) {
      return mostViewedMovies.data;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const getgenersdata = async () => {
  try {
    let res = await http.get(`/genres/getdata`);

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const getLanguagedata = async () => {
  try {
    let res = await http.get(`/language/getdata`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const getBanerdata = async () => {
  try {
    let res = await http.get(`/contents/banersdata`);
    if (res.status === 200) {
      return res.data.banners;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const postLikes = async (data, idd) => {
  return http.put(`/authenticateRoute/postlikes/${idd}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const ContentRating = async (itemid) => {
  try {
    let res = await http.post(`/contents/countratings/${itemid}`);
    if (res.status === 200) {
      console.log(res.data, "res");
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

// latestreleased
const getLatestreleased = async () => {
  try {
    let res = await http.get(`/contents/latestreleased`);
    const onlyMovieList = res.data.content.filter(
      (movie) => movie.section === "movie"
    );
    if (res.status === 200) {
      return onlyMovieList;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const getLikes = async (id) => {
  try {
    let res = await http.get(`/authenticateRoute/getlikes/${id}`);
    if (res.status === 200) {
      console.log(res.data.likedMovies);
      return res.data.likedMovies;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const getAllUSer = async () => {
  try {
    let res = await http.get(`/authenticateRoute/getalluser`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};
const ContentsPageService = {
  fetchContentsList,
  fetchMostViewList,
  postViews,
  getgenersdata,
  getLanguagedata,
  getBanerdata,
  postLikes,
  ContentRating,
  getLatestreleased,
  getByContenId,
  getLikes,
  getAllUSer,
};

export default ContentsPageService;
