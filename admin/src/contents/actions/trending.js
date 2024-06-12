import {
    // FILE_UPLOAD,
    CREATE_TRENDING,
    RETRIEVE_TRENDING,
    UPDATE_TRENDING,
    DELETE_TRENDING,
  } from "./type";
  import TrendingPageService from "../service/trendingpage.service";
  // export const fileUpload = (data) => async (dispatch) => {
  //   try {
  //     const res = await TrendingPageService.fileUpload(data);
  //     dispatch({
  //       type: FILE_UPLOAD,
  //       payload: res.data.data,
  //     });
  //     return Promise.resolve(res.data);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // };
  export const createTrending = (data) => async (dispatch) => {
    try {
      const res = await TrendingPageService.createTrending(data);
      // let dataFilter = {};
      // const result = await TrendingPageService.fetchTrendingList(dataFilter);

      dispatch({
        type: CREATE_TRENDING,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveTrending = (data) => async (dispatch) => {
    try {
      const res = await TrendingPageService.fetchTrendingList(data);
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_TRENDING,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
      //  // console.log(err);
    }
  };
  export const updateTrending = (data) => async (dispatch) => {
    try {
      const res = await TrendingPageService.updateTrending(data);
      dispatch({
        type: UPDATE_TRENDING,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changeTrendingStatus = (data) => async (dispatch) => {
    try {
      const res = await TrendingPageService.changeTrendingStatus(data);
      dispatch({
        type: UPDATE_TRENDING,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteTrending = (data) => async (dispatch) => {
    try {
      const res = await TrendingPageService.trashTrending(data);
      dispatch({
        type: DELETE_TRENDING,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };