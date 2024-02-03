import http from "../../http-common.class";
var sha1 = require('sha1');
class HomepageService {
  getAll(data) {
    let api_token_id = sha1('CpanelCategory') + '-' + sha1(process.env.REACT_APP_API_URL) + '-' + process.env.REACT_APP_DI + '-' + sha1('m_category') + '-1';
    return http.post(`call_functions.php?api_token_id=${api_token_id}&api_mode=fetch&api_secret_id=${process.env.REACT_APP_SECRET_KEY}`, {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }, data
    });
  }
  // get(id) {
  //   return http.get(`/tutorials/${id}`);
  // }
  // create(data) {
  //   return http.post("/tutorials", data);
  // }
  changeStatus(data) {
    let api_token_id = sha1('CpanelCategory') + '-' + sha1(process.env.REACT_APP_API_URL) + '-' + process.env.REACT_APP_DI + '-' + sha1('m_category') + '-1';
    return http.post(`call_functions.php?api_token_id=${api_token_id}&api_mode=update&api_secret_id=${process.env.REACT_APP_SECRET_KEY}`, {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }, data
    });
  }
  // delete(id) {
  //   return http.delete(`/tutorials/${id}`);
  // }
  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }
  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}
export default new HomepageService();