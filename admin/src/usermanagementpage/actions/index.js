import {
    CREATE_USER,
    RETRIEVE_USER,
    UPDATE_USER,
    DELETE_USER,
    CREATE_ORGANIZATION,
    RETRIEVE_ORGANIZATION,
    UPDATE_ORGANIZATION,
    DELETE_ORGANIZATION,
  } from "./type";
  import UserManagementPageService from "../service/usermanagementpage.service";
  export const createUser = (data) => async (dispatch) => {
    try {
      const res = await UserManagementPageService.createUser(data);
      // let dataFilter = {};
      // const result = await UserManagementPageService.fetchUserList(dataFilter);

      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveUsers = (data) => async (dispatch) => {
    try {
      const res = await UserManagementPageService.fetchUserList(data);
      dispatch({
        type: RETRIEVE_USER,
        status: '',
        response: {},
        payload: res.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateUser = (data) => async (dispatch) => {
    try {
      const res = await UserManagementPageService.changeUserStatus(data);
      dispatch({
        type: UPDATE_USER,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteUser = (data) => async (dispatch) => {
    try {
      const res = await UserManagementPageService.trashUser(data);
      dispatch({
        type: DELETE_USER,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };








  // export const createOrganization = (data) => async (dispatch) => {
  //   try {
  //     const res = await UserManagementPageService.createOrganization(data);
  //     // let dataFilter = {};
  //     // const result = await UserManagementPageService.fetchOrganizationList(dataFilter);
  //     dispatch({
  //       type: CREATE_ORGANIZATION,
  //       payload: res.data,
  //       // payload: result.data, 
  //     });
  //     return Promise.resolve(res.data);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // };
  // export const retrieveOrganization = (data) => async (dispatch) => {
  //   try {
  //     const res = await UserManagementPageService.fetchOrganizationList(data);
  //     dispatch({
  //       type: RETRIEVE_ORGANIZATION,
  //       status: '',
  //       response: {},
  //       payload: res.data,
  //     });
  //   } catch (err) {
  //      // console.log(err);
  //   }
  // };
  export const updateOrganization = (data) => async (dispatch) => {
    try {
      const res = await UserManagementPageService.changeOrganizationStatus(data);
      dispatch({
        type: UPDATE_ORGANIZATION,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteOrganization = (data) => async (dispatch) => {
    try {
      const res = await UserManagementPageService.trashOrganization(data);
      dispatch({
        type: DELETE_ORGANIZATION,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };