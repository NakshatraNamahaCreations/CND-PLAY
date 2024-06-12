import {
  CREATE_PAYMENT_CREDENTIAL_SETUP,
  RETRIEVE_PAYMENT_CREDENTIAL_SETUP,
  UPDATE_PAYMENT_CREDENTIAL_SETUP,
  DELETE_PAYMENT_CREDENTIAL_SETUP,
} from "../actions/type";
const initialState = [];
function PaymentCredentialSetupReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PAYMENT_CREDENTIAL_SETUP:
      return {data: [...state.data], payload};
    case RETRIEVE_PAYMENT_CREDENTIAL_SETUP:
      state = (payload.error == 1)?initialState:payload;
      // Object.assign(state,payload);
      // console.log("state", {data: [...state], payload});
      return {data: [...state], payload};
      // return {data: [...state], payload};
    case UPDATE_PAYMENT_CREDENTIAL_SETUP:
      return {data: [...state.data], payload};
    case DELETE_PAYMENT_CREDENTIAL_SETUP:
      return {data: [...state.data], payload};
    default:
      return state;
  }
};
export {PaymentCredentialSetupReducer};