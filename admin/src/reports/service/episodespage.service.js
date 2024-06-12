import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

// Call APIs For Episodes

const createEpisodes = (data) => {
  return http.post(`episodes/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const fetchEpisodesList = async (datacount, page) => {
  let res = await http.get(`episodes/list`, {
    params: {
      datacount: datacount,
      page: page,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
};
const updateEpisodes = (data, idd) => {
  return http.put(`episodes/update/${idd}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const changeEpisodesStatus = (data) => {
  return http.post(`episodes/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};
const trashEpisodes = (idd) => {
  return http.post(`episodes/trash/${idd}`);
};

const EpisodesPageService = {
  fetchEpisodesList,
  createEpisodes,
  updateEpisodes,
  changeEpisodesStatus,
  trashEpisodes,
};
export default EpisodesPageService;
