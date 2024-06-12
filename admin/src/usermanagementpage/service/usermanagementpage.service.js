import http from "../../http-common.function";

// Call APIs For Users

const createUser = (data) => {
  return http.post(`userManagement/createUser`, data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
  });
};

const fetchUserList = async () => {
  let res = await http.get(`userManagement/getdata`);
  if (res.status === 200) {
    return res.data;
  }
};
const updateuser = (data, idd) => {
  return http.put(`userManagement/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changeUserStatus = (data) => {
  return http.post(`userManagement/changeUserStatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

// Call APIs For Organization

const createOrganization = (data) => {
  return http.post(`organization/createOrganization`, data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json;charset=UTF-8",
    },
  });
};
const createUserManagement = (data) => {
  return http.post(`organization/usmanagement`, data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json;charset=UTF-8",
    },
  });
};
const updateOrganization = (data, idd) => {
  return http.put(`organization/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const fetchOrganizationList = async () => {
  let res = await http.get(`organization/getdata`);
  if (res.status === 200) {
    return res.data;
  }
};

const changeOrganizationStatus = (data) => {
  return http.post(`organization/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

const trashOrganization = (idd) => {
  return http.post(`organization/trash/${idd}`);
};
const trashUser = (idd) => {
  return http.post(`userManagement/trash/${idd}`);
};
const UserManagementPageService = {
  fetchUserList,
  createUser,
  updateuser,
  changeUserStatus,
  trashUser,
  fetchOrganizationList,
  createOrganization,
  changeOrganizationStatus,
  trashOrganization,
  createUserManagement,
  updateOrganization,
};
export default UserManagementPageService;
