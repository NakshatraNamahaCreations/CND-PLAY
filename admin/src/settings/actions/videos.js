import {
    FILE_UPLOAD,
    CREATE_VIDEOS,
    RETRIEVE_VIDEOS,
    UPDATE_VIDEOS,
    DELETE_VIDEOS,
  } from "./type";
  import VideospageService from "../service/videospage.service";
  export const fileUpload = (data) => async (dispatch) => {
    try {
      const res = await VideospageService.fileUpload(data);
      dispatch({
        type: FILE_UPLOAD,
        payload: res.data.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };



  export const createVideos = (data) => async (dispatch) => {
    try {
      const res = await VideospageService.createVideos(data);
      // let dataFilter = {};
      // const result = await VideospageService.fetchVideosList(dataFilter);

      dispatch({
        type: CREATE_VIDEOS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveVideos = (data) => async (dispatch) => {
    try {
      const res = await VideospageService.fetchVideosList(data);
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_VIDEOS,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateVideos = (data) => async (dispatch) => {
    try {
      const res = await VideospageService.updateVideos(data);
      dispatch({
        type: UPDATE_VIDEOS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changeVideosStatus = (data) => async (dispatch) => {
    try {
      const res = await VideospageService.changeVideosStatus(data);
      dispatch({
        type: UPDATE_VIDEOS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteVideos = (data) => async (dispatch) => {
    try {
      const res = await VideospageService.trashVideos(data);
      dispatch({
        type: DELETE_VIDEOS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };