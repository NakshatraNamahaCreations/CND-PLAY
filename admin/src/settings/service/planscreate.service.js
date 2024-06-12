import http from "../../http-common.function";

const createPlanSetup = (data) => {
  return http.post(`plans/create`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const fetchPlanSetupList = async () => {
  let response = await http.get(`plans/getalldata`);

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
