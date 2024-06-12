import {
    // FILE_UPLOAD,
    CREATE_CONTENTS,
    RETRIEVE_CONTENTS,
    UPDATE_CONTENTS,
    DELETE_CONTENTS,
  } from "./type";
  import ContentsPageService from "../service/contentspage.service";

  // export const fileUpload = (data) => async (dispatch) => {
  //   try {
  //     const res = await ContentsPageService.fileUpload(data);
  //     dispatch({
  //       type: FILE_UPLOAD,
  //       payload: res.data.data,
  //     });
  //     return Promise.resolve(res.data);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // };


export const createContents = (data) => async (dispatch) => {


  try {
    const res = await ContentsPageService.createContents(data);

    dispatch({
      type: CREATE_CONTENTS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

  export const retrieveContents = (data) => async (dispatch) => {

    try {
      const res = await ContentsPageService.fetchContentsList(data);

      dispatch({
        type: RETRIEVE_CONTENTS,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateContents = (data) => async (dispatch) => {
    try {
      const res = await ContentsPageService.updateContents(data);
      dispatch({
        type: UPDATE_CONTENTS,
        payload: res.data,
      });
      
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changeContentsStatus = (data) => async (dispatch) => {
    try {
      const res = await ContentsPageService.changeContentsStatus(data);
      dispatch({
        type: UPDATE_CONTENTS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteContents = (data) => async (dispatch) => {
    try {
      const res = await ContentsPageService.trashContents(data);
      dispatch({
        type: DELETE_CONTENTS,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };