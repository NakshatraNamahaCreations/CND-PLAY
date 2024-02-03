import axios from 'axios';
var sha1 = require('sha1');

// Callback
const fetchCategoryList = function(status, parent_id, callback) {
  let data = {
      "condition_array": [{
          business_id: 1,
          parent_id: parent_id,
          status: status,
      }],
  };
  let api_token_id = sha1('CpanelCategory') + '-' + sha1(process.env.REACT_APP_API_URL) + '-' + process.env.REACT_APP_DI + '-' + sha1('m_category') + '-1';
  axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_URL}/code_uplers_apis/call_functions.php?api_token_id=${api_token_id}&api_mode=fetch&api_secret_id=${process.env.REACT_APP_SECRET_KEY}`, {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }, data
  }).then(response => {
    //   console.log(response);
    //   return response.data;
      callback(response.data);
  }).catch(function (error) {
      console.log(error);
  });
}




// // Async

// const fetchCategoryList = async (status, parent_id) => {
//     let data = {
//         "condition_array": [{
//             business_id: 1,
//             parent_id: parent_id,
//             status: status,
//         }],
//     };
//     let api_token_id = sha1('CpanelCategory') + '-' + sha1(process.env.REACT_APP_API_URL) + '-' + process.env.REACT_APP_DI + '-' + sha1('m_category') + '-1';
//     axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_URL}/code_uplers_apis/call_functions.php?api_token_id=${api_token_id}&api_mode=fetch&api_secret_id=${process.env.REACT_APP_SECRET_KEY}`, {
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//             "Access-Control-Allow-Origin": "*",
//         }, data
//     }).then(response => {
//       //   console.log(response);
//         return response.data;
//         // callback(response.data);
//     }).catch(function (error) {
//         console.log(error);
//     });
//   }
  
  

// const FetchListData = async (status, parent_id) => {
//     await fetchCategoryList(status, parent_id, (response) => {
//         console.log(response);
//         return response;
//     });
// };
  
export default fetchCategoryList;