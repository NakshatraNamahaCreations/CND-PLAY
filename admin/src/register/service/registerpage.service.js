import http from "../../http-common.function";

// Call APIs For Register

const makeRegister = (data) => {
  return http.post(`authenticate/makeregister`, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

const RegisterPageService = {
  makeRegister,
};
export default RegisterPageService;
