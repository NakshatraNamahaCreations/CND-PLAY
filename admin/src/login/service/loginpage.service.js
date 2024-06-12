import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";
var sha1 = require('sha1');



// Call APIs For Login

const makeLogin = (data) => {
    return http.post(`user/makelogin`, {
      headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }, data
    });
};


const LoginPageService = {
    makeLogin,
};
export default LoginPageService;