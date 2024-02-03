import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

const fileUpload = (data) => {
  return httpf.post(`project/upload`, data);
};

// Call APIs For Project

const createProject = (data) => {
  return http.post(`project/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const fetchProjectList = async (datacount, page) => {
  let res = await http.get(`project/list`, {
    params: {
      datacount: datacount,
      page: page,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
};
const fetchProjectdata = async () => {
  let res = await http.get(`project/getdata`);
  if (res.status === 200) {
    return res.data.data;
  }
};
const updateProject = (data, idd) => {
  return http.put(`project/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changeProjectStatus = (data) => {
  return http.post(`project/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};
const trashProject = (idd) => {
  return http.post(`project/trash/${idd}`);
};

const ProjectPageService = {
  fetchProjectList,
  fileUpload,
  createProject,
  updateProject,
  changeProjectStatus,
  trashProject,
  fetchProjectdata,
};
export default ProjectPageService;
