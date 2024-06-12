import {
    FILE_UPLOAD,
    CREATE_PAYMENT_CREDENTIAL_SETUP,
    RETRIEVE_PAYMENT_CREDENTIAL_SETUP,
    UPDATE_PAYMENT_CREDENTIAL_SETUP,
    DELETE_PAYMENT_CREDENTIAL_SETUP,
  } from "./type";
  import PaymentCredentialSetupPageService from "../service/paymentcredentialsetuppage.service";
  export const fileUpload = (data) => async (dispatch) => {
    try {
      const res = await PaymentCredentialSetupPageService.fileUpload(data);
      dispatch({
        type: FILE_UPLOAD,
        payload: res.data.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };




  export const createPaymentCredentialSetup = (data) => async (dispatch) => {
    try {
      const res = await PaymentCredentialSetupPageService.createPaymentCredentialSetup(data);
      // let dataFilter = {};
      // const result = await PaymentCredentialSetupPageService.fetchPaymentCredentialSetupList(dataFilter);

      dispatch({
        type: CREATE_PAYMENT_CREDENTIAL_SETUP,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrievePaymentCredentialSetup = (data) => async (dispatch) => {
    try {
      const res = await PaymentCredentialSetupPageService.fetchPaymentCredentialSetupList(data);
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_PAYMENT_CREDENTIAL_SETUP,
        status: '',
        response: {},
        payload: res.data.data,
      });
    } catch (err) {
       // console.log(err);
    }
  };
  export const updatePaymentCredentialSetup = (data) => async (dispatch) => {
    try {
      const res = await PaymentCredentialSetupPageService.updatePaymentCredentialSetup(data);
      dispatch({
        type: UPDATE_PAYMENT_CREDENTIAL_SETUP,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const changePaymentCredentialSetupStatus = (data) => async (dispatch) => {
    try {
      const res = await PaymentCredentialSetupPageService.changePaymentCredentialSetupStatus(data);
      dispatch({
        type: UPDATE_PAYMENT_CREDENTIAL_SETUP,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deletePaymentCredentialSetup = (data) => async (dispatch) => {
    try {
      const res = await PaymentCredentialSetupPageService.trashPaymentCredentialSetup(data);
      dispatch({
        type: DELETE_PAYMENT_CREDENTIAL_SETUP,
        status: '',
        response: {},
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };


