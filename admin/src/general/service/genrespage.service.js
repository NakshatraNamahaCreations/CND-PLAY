import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

// Call APIs For Genres

const createGenres = (data) => {
  return http.post(`genres/create`, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

const fetchGenresList = async (datacount, page) => {
  let res = await http.get(`genres/list`, {
    params: {
      datacount: datacount,
      page: page,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
};

const updateGenres = (data, id) => {
  return http.put(`genres/update/${id}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changeGenresStatus = (data) => {
  return http.post(`genres/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

const trashGenres = (idd) => {
  return http.post(`genres/trash/${idd}`);
};
const GenresPageService = {
  fetchGenresList,
  createGenres,
  updateGenres,
  changeGenresStatus,
  trashGenres,
};
export default GenresPageService;
