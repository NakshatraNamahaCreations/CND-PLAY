import {
  // FILE_UPLOAD,
  CREATE_INDIE_MOVIE,
  RETRIEVE_INDIE_MOVIE,
  UPDATE_INDIE_MOVIE,
  DELETE_INDIE_MOVIE,
} from "./type";
import IndieMoviePageService from "../service/indiemoviepage.service";
// export const fileUpload = (data) => async (dispatch) => {
//   try {
//     const res = await IndieMoviePageService.fileUpload(data);
//     dispatch({
//       type: FILE_UPLOAD,
//       payload: res.data.data,
//     });
//     return Promise.resolve(res.data);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };
export const createIndieMovie = (data) => async (dispatch) => {
  try {
    const res = await IndieMoviePageService.createIndieMovie(data);
    // let dataFilter = {};
    // const result = await IndieMoviePageService.fetchIndieMovieList(dataFilter);

    dispatch({
      type: CREATE_INDIE_MOVIE,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const retrieveIndieMovie = (data) => async (dispatch) => {
  try {
    const res = await IndieMoviePageService.fetchIndieMovieList(data);

    dispatch({
      type: RETRIEVE_INDIE_MOVIE,
      status: "",
      response: {},
      payload: res.data.data,
    });
  } catch (err) {
    //  // console.log(err);
  }
};
export const updateIndieMovie = (data) => async (dispatch) => {
  try {
    const res = await IndieMoviePageService.updateIndieMovie(data);
    dispatch({
      type: UPDATE_INDIE_MOVIE,
      status: "",
      response: {},
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const changeIndieMovieStatus = (data) => async (dispatch) => {
  try {
    const res = await IndieMoviePageService.changeIndieMovieStatus(data);
    dispatch({
      type: UPDATE_INDIE_MOVIE,
      status: "",
      response: {},
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteIndieMovie = (data) => async (dispatch) => {
  try {
    const res = await IndieMoviePageService.trashIndieMovie(data);
    dispatch({
      type: DELETE_INDIE_MOVIE,
      status: "",
      response: {},
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
