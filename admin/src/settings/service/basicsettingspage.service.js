import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";


const fileUpload = (data) => {
  return httpf.post(`basic_settings/upload`, data);
};

// Call APIs For BasicSettings

const createBasicSettings = (data) => {
  return http.post(`basic_settings/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const fetchBasicSettingsList = async (data) => {
  let res = await http.get(`basic_settings/getdata`);
  if (res.status === 200) {
    return res.data;
  }
};
const updateBasicSettings = (data, idd) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return http.put(`basic_settings/update/${idd}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changeBasicSettingsStatus = (data) => {
  return http.post(`basic_settings/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};
const trashBasicSettings = (data) => {
  return http.post(`basic_settings/trash/${data}`);
};

const BasicSettingsPageService = {
  fetchBasicSettingsList,
  fileUpload,
  createBasicSettings,
  updateBasicSettings,
  changeBasicSettingsStatus,
  trashBasicSettings,
};
export default BasicSettingsPageService;
