import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

// Call APIs For Videos

const createVideos = (data) => {
  return http.post(`videos/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};


const fetchVideosList = async (data) => {
  let res = await http.get(`videos/getdata`);
  if (res.status === 200) {
    return res.data;
  }
};
const updateVideos = (data, idd) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);

  });

  return http.put(`videos/update/${idd}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const changeVideosStatus = (data) => {
  return http.post(`videos/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};
const trashVideos = (idd) => {
  return http.post(`videos/trash/${idd}`);
};

const VideosPageService = {
  fetchVideosList,
  createVideos,
  updateVideos,
  changeVideosStatus,
  trashVideos,
};
export default VideosPageService;
