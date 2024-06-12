import {
    CREATE_UNKNOWN_TOPIC,
    RETRIEVE_UNKNOWN_TOPICS,
    UPDATE_UNKNOWN_TOPIC,
    DELETE_UNKNOWN_TOPIC,
    DELETE_ALL_UNKNOWN_TOPICS,
  } from "./type";
  import HomepageService from "../service/homepage.function.service";
  export const createAllUnknownTopic = (title, description) => async (dispatch) => {
    try {
      const res = await HomepageService.create({ title, description });
      Promise.resolve(res.data);
      dispatch({
        type: CREATE_UNKNOWN_TOPIC,
        payload: res.data,
      });
      // return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveAllUnknownTopics = (data) => async (dispatch) => {
    try {
      const res = await HomepageService.getAll(data);
      dispatch({
        type: RETRIEVE_UNKNOWN_TOPICS,
        payload: res.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updateAllUnknownTopic = (id, data) => async (dispatch) => {
    try {
      const res = await HomepageService.update(id, data);
      dispatch({
        type: UPDATE_UNKNOWN_TOPIC,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteAllUnknownTopic = (id) => async (dispatch) => {
    try {
      await HomepageService.remove(id);
      dispatch({
        type: DELETE_UNKNOWN_TOPIC,
        payload: { id },
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const deleteAllAllUnknownTopics = () => async (dispatch) => {
    try {
      const res = await HomepageService.removeAll();
      dispatch({
        type: DELETE_ALL_UNKNOWN_TOPICS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const findAllUnknownTopicsByTitle = (title) => async (dispatch) => {
    try {
      const res = await HomepageService.findByTitle(title);
      dispatch({
        type: RETRIEVE_UNKNOWN_TOPICS,
        payload: res.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };