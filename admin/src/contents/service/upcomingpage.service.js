import http from "../../http-common.function";
// import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

// const fileUpload = (data) => {
//   return httpf.post(`upcoming/upload`, data);
// };

// Call APIs For Upcoming

const createUpcoming = (data) => {
  return http.post(`upcoming/create`, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

const fetchUpcomingList = async (datacount,page) => {
  let res = await http.get(`upcoming/list`,{ params: {
    datacount: datacount,
    page: page,
  },});
  if (res.status === 200) {
    return res.data;
  }
};
const updateUpcoming = (data, idd) => {
  return http.put(`upcoming/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changeUpcomingStatus = (data) => {
  return http.post(`upcoming/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};
const trashUpcoming = (data) => {
  
  return http.post(`upcoming/trash/${data}`);
};

const UpcomingPageService = {
  fetchUpcomingList,
  //   fileUpload,
  createUpcoming,
  updateUpcoming,
  changeUpcomingStatus,
  trashUpcoming,
};
export default UpcomingPageService;
