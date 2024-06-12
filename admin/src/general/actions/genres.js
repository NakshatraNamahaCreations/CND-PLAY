import {
  // FILE_UPLOAD,
  CREATE_GENRES,
  RETRIEVE_GENRES,
  UPDATE_GENRES,
  DELETE_GENRES,
} from "./type";
import GenresPageService from "../service/genrespage.service";
// export const fileUpload = (data) => async (dispatch) => {
//   try {
//     const res = await GenresPageService.fileUpload(data);
//     dispatch({
//       type: FILE_UPLOAD,
//       payload: res.data.data,
//     });
//     return Promise.resolve(res.data);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };
export const createGenres = (data) => async (dispatch) => {
  try {
    const res = await GenresPageService.createGenres(data);
    // let dataFilter = {};
    // const result = await GenresPageService.fetchGenresList(dataFilter);

    dispatch({
      type: CREATE_GENRES,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const retrieveGenres = (data) => async (dispatch) => {
  try {
    const res = await GenresPageService.fetchGenresList(data);
    // console.log(res.data)
    dispatch({
      type: RETRIEVE_GENRES,
      status: '',
      response: {},
      payload: res.data.data,
    });
  } catch (err) {
     // console.log(err);
  }
};
export const updateGenres = (data) => async (dispatch) => {
  try {
    const res = await GenresPageService.updateGenres(data);
    dispatch({
      type: UPDATE_GENRES,
      status: '',
      response: {},
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const changeGenresStatus = (data) => async (dispatch) => {
  try {
    const res = await GenresPageService.changeGenresStatus(data);
    dispatch({
      type: UPDATE_GENRES,
      status: '',
      response: {},
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteGenres = (data) => async (dispatch) => {
  try {
    const res = await GenresPageService.trashGenres(data);
    dispatch({
      type: DELETE_GENRES,
      status: '',
      response: {},
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};