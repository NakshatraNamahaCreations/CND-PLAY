import {
    FILE_UPLOAD,
    CREATE_EPISODES,
    RETRIEVE_EPISODES,
    UPDATE_EPISODES,
    DELETE_EPISODES,
  } from "./type";

  import EpisodesPageService from "../service/episodespage.service";

  export const fileUpload = (data) => async (dispatch) => {
    try {
      const res = await EpisodesPageService.fileUpload(data);
      dispatch({
        type: FILE_UPLOAD,
        payload: res.data.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  


  export const createEpisodes = (data) => async (dispatch) => {
    try {
      const res = await EpisodesPageService.createEpisodes(data);
      // let dataFilter = {};
      // const result = await EpisodesPageService.fetchEpisodesList(dataFilter);

      dispatch({
        type: CREATE_EPISODES,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveEpisodes = (data) => async (dispatch) => {
    try {
      const res = await EpisodesPageService.fetchEpisodesList(data);
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_EPISODES,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateEpisodes = (data) => async (dispatch) => {
    try {
      const res = await EpisodesPageService.updateEpisodes(data);
      dispatch({
        type: UPDATE_EPISODES,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changeEpisodesStatus = (data) => async (dispatch) => {
    try {
      const res = await EpisodesPageService.changeEpisodesStatus(data);
      dispatch({
        type: UPDATE_EPISODES,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteEpisodes = (data) => async (dispatch) => {
    try {
      const res = await EpisodesPageService.trashEpisodes(data);
      dispatch({
        type: DELETE_EPISODES,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };





