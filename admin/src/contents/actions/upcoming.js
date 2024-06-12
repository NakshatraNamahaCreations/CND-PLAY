import {
    // FILE_UPLOAD,
    CREATE_UPCOMING,
    RETRIEVE_UPCOMING,
    UPDATE_UPCOMING,
    DELETE_UPCOMING,
  } from "./type";
  import UpcomingPageService from "../service/upcomingpage.service";
  // export const fileUpload = (data) => async (dispatch) => {
  //   try {
  //     const res = await UpcomingPageService.fileUpload(data);
  //     dispatch({
  //       type: FILE_UPLOAD,
  //       payload: res.data.data,
  //     });
  //     return Promise.resolve(res.data);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // };
  export const createUpcoming = (data) => async (dispatch) => {
    try {
      const res = await UpcomingPageService.createUpcoming(data);
      // let dataFilter = {};
      // const result = await UpcomingPageService.fetchUpcomingList(dataFilter);

      dispatch({
        type: CREATE_UPCOMING,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveUpcoming = (data) => async (dispatch) => {
    try {
      const res = await UpcomingPageService.fetchUpcomingList(data);
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_UPCOMING,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateUpcoming = (data) => async (dispatch) => {
    try {
      const res = await UpcomingPageService.updateUpcoming(data);
      dispatch({
        type: UPDATE_UPCOMING,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changeUpcomingStatus = (data) => async (dispatch) => {
    try {
      const res = await UpcomingPageService.changeUpcomingStatus(data);
      dispatch({
        type: UPDATE_UPCOMING,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteUpcoming = (data) => async (dispatch) => {
    try {
      const res = await UpcomingPageService.trashUpcoming(data);
      dispatch({
        type: DELETE_UPCOMING,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };