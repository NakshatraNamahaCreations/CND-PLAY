import {
    FILE_UPLOAD,
    CREATE_SERIES,
    RETRIEVE_SERIES,
    UPDATE_SERIES,
    DELETE_SERIES,
  } from "./type";
  import SeriesPageService from "../service/seriespage.service";
  export const fileUpload = (data) => async (dispatch) => {
    try {
      const res = await SeriesPageService.fileUpload(data);
      dispatch({
        type: FILE_UPLOAD,
        payload: res.data.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };




  export const createSeries = (data) => async (dispatch) => {
    try {
      const res = await SeriesPageService.createSeries(data);
      // let dataFilter = {};
      // const result = await SeriesPageService.fetchSeriesList(dataFilter);

      dispatch({
        type: CREATE_SERIES,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveSeries = (data) => async (dispatch) => {
    try {
      const res = await SeriesPageService.fetchSeriesList(data);
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_SERIES,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateSeries = (data) => async (dispatch) => {
    try {
      const res = await SeriesPageService.updateSeries(data);
      dispatch({
        type: UPDATE_SERIES,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changeSeriesStatus = (data) => async (dispatch) => {
    try {
      const res = await SeriesPageService.changeSeriesStatus(data);
      dispatch({
        type: UPDATE_SERIES,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteSeries = (data) => async (dispatch) => {
    try {
      const res = await SeriesPageService.trashSeries(data);
      dispatch({
        type: DELETE_SERIES,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };


