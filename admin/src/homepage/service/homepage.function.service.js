import http from "../../http-common.function";
var sha1 = require('sha1');
const getAll = (data) => {
  let api_token_id = sha1('CpanelCategory') + '-' + sha1(process.env.REACT_APP_API_URL) + '-' + process.env.REACT_APP_DI + '-' + sha1('m_category') + '-1';
  return http.post(`call_functions.php?api_token_id=${api_token_id}&api_mode=fetch&api_secret_id=${process.env.REACT_APP_SECRET_KEY}`, {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }, data
  });
};
const changeStatus = (data) => {
  let api_token_id = sha1('CpanelCategory') + '-' + sha1(process.env.REACT_APP_API_URL) + '-' + process.env.REACT_APP_DI + '-' + sha1('m_category') + '-1';
  return http.post(`call_functions.php?api_token_id=${api_token_id}&api_mode=fetch&api_secret_id=${process.env.REACT_APP_SECRET_KEY}`, {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }, data
  });
};
// const get = id => {
//   return http.get(`/tutorials/${id}`);
// };
// const create = data => {
//   return http.post("/tutorials", data);
// };
// const update = (id, data) => {
//   return http.put(`/tutorials/${id}`, data);
// };
// const remove = id => {
//   return http.delete(`/tutorials/${id}`);
// };
// const removeAll = () => {
//   return http.delete(`/tutorials`);
// };
// const findByTitle = title => {
//   return http.get(`/tutorials?title=${title}`);
// };
const HomepageService = {
  getAll,
  changeStatus,
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle
};
export default HomepageService;