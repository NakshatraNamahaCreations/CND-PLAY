import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

const fileUpload = (data) => {
  return httpf.post(`districts/upload`, data);
};

// Call APIs For Districts

const createDistricts = (data) => {
  return http.post(`districts/create`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

const fetchDistrictsList = async (datacount, page) => {
  let res = await http.get(`districts/list`, {
    params: {
      datacount: datacount,
      page: page,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
};

const updateDistricts = (data, idd) => {
  return http.put(`districts/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changeDistrictsStatus = (data) => {
  return http.post(`districts/changestatus`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

const trashDistricts = (idd) => {
  return http.post(`districts/trash/${idd}`);
};

const updatelanguage = (data, idd) => {
  return http.put(`language/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const fetchlanguageList = async (datacount, page) => {
  let res = await http.get(`language/list`, {
    params: {
      datacount: datacount,
      page: page,
    },
  });
  if (res.status === 200) {
    // console.log(res.data);
    return res.data;
  }
};
const trashlanguage = (idd) => {
  return http.post(`language/trash/${idd}`);
};
const DistrictsPageService = {
  fetchDistrictsList,
  fileUpload,
  createDistricts,
  updateDistricts,
  changeDistrictsStatus,
  trashDistricts,
  updatelanguage,
  trashlanguage,
  fetchlanguageList,
};
export default DistrictsPageService;
