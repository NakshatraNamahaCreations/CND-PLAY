import {
    FILE_UPLOAD,
    CREATE_PROJECT,
    RETRIEVE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
  } from "./type";
  import ProjectPageService from "../service/projectpage.service";
  export const fileUpload = (data) => async (dispatch) => {
    try {
      const res = await ProjectPageService.fileUpload(data);
      dispatch({
        type: FILE_UPLOAD,
        payload: res.data.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const createProject = (data) => async (dispatch) => {
    try {
      const res = await ProjectPageService.createProject(data);
      // let dataFilter = {};
      // const result = await ProjectPageService.fetchProjectList(dataFilter);

      dispatch({
        type: CREATE_PROJECT,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveProject = (data) => async (dispatch) => {
    try {
      const res = await ProjectPageService.fetchProjectList(data);
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_PROJECT,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateProject = (data) => async (dispatch) => {
    try {
      const res = await ProjectPageService.updateProject(data);
      dispatch({
        type: UPDATE_PROJECT,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changeProjectStatus = (data) => async (dispatch) => {
    try {
      const res = await ProjectPageService.changeProjectStatus(data);
      dispatch({
        type: UPDATE_PROJECT,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteProject = (data) => async (dispatch) => {
    try {
      const res = await ProjectPageService.trashProject(data);
      dispatch({
        type: DELETE_PROJECT,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };