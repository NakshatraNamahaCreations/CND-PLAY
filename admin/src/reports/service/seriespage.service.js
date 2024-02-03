import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

// Call APIs For Series

const createSeries = (data) => {
  return http.post(`series/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const fetchSeriesList = async () => {
  let res = await http.get(`series/getdata`);
  if (res.status === 200) {
    return res.data;
  }
};

const updateSeries = (data, idd) => {
  return http.put(`series/update/${idd}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const trashSeries = (idd) => {
  return http.post(`series/trash/${idd}`);
};

const changeSeriesStatus = (data) => {
  return http.post(`series/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};


const SeriesPageService = {
  fetchSeriesList,
  createSeries,
  updateSeries,
  changeSeriesStatus,
  trashSeries,
};
export default SeriesPageService;
