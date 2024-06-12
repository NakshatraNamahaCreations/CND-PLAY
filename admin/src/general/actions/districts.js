import {
    // FILE_UPLOAD,
    CREATE_DISTRICTS,
    RETRIEVE_DISTRICTS,
    UPDATE_DISTRICTS,
    DELETE_DISTRICTS,
  } from "./type";
  import DistrictsPageService from "../service/districtspage.service";
  // export const fileUpload = (data) => async (dispatch) => {
  //   try {
  //     const res = await DistrictsPageService.fileUpload(data);
  //     dispatch({
  //       type: FILE_UPLOAD,
  //       payload: res.data.data,
  //     });
  //     return Promise.resolve(res.data);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // };
  export const createDistricts = (data) => async (dispatch) => {
    try {
      const res = await DistrictsPageService.createDistricts(data);
      // let dataFilter = {};
      // const result = await DistrictsPageService.fetchDistrictsList(dataFilter);

      dispatch({
        type: CREATE_DISTRICTS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveDistricts = (data) => async (dispatch) => {
    try {
      const res = await DistrictsPageService.fetchDistrictsList(data);
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_DISTRICTS,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateDistricts = (data) => async (dispatch) => {
    try {
      const res = await DistrictsPageService.updateDistricts(data);
      dispatch({
        type: UPDATE_DISTRICTS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changeDistrictsStatus = (data) => async (dispatch) => {
    try {
      const res = await DistrictsPageService.changeDistrictsStatus(data);
      dispatch({
        type: UPDATE_DISTRICTS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteDistricts = (data) => async (dispatch) => {
    try {
      const res = await DistrictsPageService.trashDistricts(data);
      dispatch({
        type: DELETE_DISTRICTS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };