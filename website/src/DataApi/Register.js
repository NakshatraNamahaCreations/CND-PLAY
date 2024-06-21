import http from "../http-common.function";

const Logout = async () => {
  try {
    let res = await http.get(`/authenticateRoute/makelogout`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    // console.error("Error fetching trending list:", error);
  }
};

const Register = async (data) => {
  return http.post(`/authenticateRoute/makeregister`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const GetUserById = async (id) => {
  try {
    if (id) {
      let res = await http.get(`/authenticateRoute/getbyuserid/${id}`);
      if (res.status === 200) {
        return res.data;
      }
    }
  } catch (error) {
    // console.error("Error fetching continue watching:", error);
  }
};

const getAllDistricts = async (id) => {
  try {
    let res = await http.get(`/districts/getdata`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    // console.error("Error fetching trending list:", error);
  }
};

const update = async (data, id) => {
  return await http.put(`/authenticateRoute/update/${id}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const PurchasePlan = async (data, id) => {
  return await http.put(`/authenticateRoute/plan/${id}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const updatePurchaseContent = async (data, id) => {
  return await http.put(`/authenticateRoute/purchasecontent/${id}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
// purchasecontent
const Login = async (data) => {
  try {
    const response = await http.post("/authenticateRoute/makelogin", data, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const RegisterPage = {
  Logout,
  Register,
  GetUserById,
  getAllDistricts,
  update,
  Login,
  updatePurchaseContent,
  PurchasePlan,
};

export default RegisterPage;
