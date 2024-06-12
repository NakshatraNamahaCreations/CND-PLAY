import http from "../../http-common.function";


// Call APIs For Payment Credential Setup

const createPaymentCredentialSetup = (data) => {
  return http.post(`paymentcredentialsetup/create`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const fetchPaymentCredentialSetupList = async (data) => {
  let response = await http.get(`paymentcredentialsetup/list`);

  if (response.status === 200) {
    return response.data;
  }
};

const updatePaymentCredentialSetup = (data, idd) => {
  return http.put(`paymentcredentialsetup/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changePaymentCredentialSetupStatus = (data) => {
  return http.post(`paymentcredentialsetup/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};
const trashPaymentCredentialSetup = (data) => {
  return http.post(`paymentcredentialsetup/trash/${data}`);
};

const PaymentCredentialSetupPageService = {
  fetchPaymentCredentialSetupList,
  createPaymentCredentialSetup,
  updatePaymentCredentialSetup,
  changePaymentCredentialSetupStatus,
  trashPaymentCredentialSetup,
};
export default PaymentCredentialSetupPageService;
