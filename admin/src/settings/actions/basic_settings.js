import {
    FILE_UPLOAD,
    CREATE_BASIC_SETTINGS,
    RETRIEVE_BASIC_SETTINGS,
    UPDATE_BASIC_SETTINGS,
    DELETE_BASIC_SETTINGS,
  } from "./type";
  import BasicSettingsPageService from "../service/basicsettingspage.service";
  export const fileUpload = (data) => async (dispatch) => {
    try {
      const res = await BasicSettingsPageService.fileUpload(data);
      dispatch({
        type: FILE_UPLOAD,
        payload: res.data.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const createBasicSettings = (data) => async (dispatch) => {
    try {
      const res = await BasicSettingsPageService.createBasicSettings(data);
      // let dataFilter = {};
      // const result = await BasicSettingsPageService.fetchBasicSettingsList(dataFilter);

      dispatch({
        type: CREATE_BASIC_SETTINGS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveBasicSettings = (data) => async (dispatch) => {
    try {
      const res = await BasicSettingsPageService.fetchBasicSettingsList(data);
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_BASIC_SETTINGS,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateBasicSettings = (data) => async (dispatch) => {
    try {
      const res = await BasicSettingsPageService.updateBasicSettings(data);
      dispatch({
        type: UPDATE_BASIC_SETTINGS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changeBasicSettingsStatus = (data) => async (dispatch) => {
    try {
      const res = await BasicSettingsPageService.changeBasicSettingsStatus(data);
      dispatch({
        type: UPDATE_BASIC_SETTINGS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteBasicSettings = (data) => async (dispatch) => {
    try {
      const res = await BasicSettingsPageService.trashBasicSettings(data);
      dispatch({
        type: DELETE_BASIC_SETTINGS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };