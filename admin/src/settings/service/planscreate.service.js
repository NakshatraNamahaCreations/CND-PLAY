import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

// Call APIs For Payment Credential Setup

const createPlanSetup = (data) => {
  return http.post(`plans/create`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const fetchPlanSetupList = async (data) => {
  let response = await http.get(`plans/getdata`);

  if (response.status === 200) {
    return response.data;
  }
};

const updatePlanSetup = (data, idd) => {
  return http.put(`plans/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changePlanSetupStatus = (data) => {
  return http.post(`plans/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};
const trashPlanSetup = (data) => {
  return http.post(`plans/trash/${data}`);
};

const PlansSetupPageService = {
  fetchPlanSetupList,
  createPlanSetup,
  updatePlanSetup,
  changePlanSetupStatus,
  trashPlanSetup,
};
export default PlansSetupPageService;
