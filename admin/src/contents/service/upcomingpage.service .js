// import http from "../../http-common.function";
// // import httpf from "../../http-file-upload.function";
// var sha1 = require("sha1");

// // const fileUpload = (data) => {
// //   return httpf.post(`upcoming/upload`, data);
// // };

// // Call APIs For Upcoming

// const createUpcoming = (data) => {
//   return http.post(`upcoming/create`, {
//     headers: {
//       "Content-Type": "multipart/form-data;charset=UTF-8",
//       "Access-Control-Allow-Origin": "*",
//     },
//     data,
//   });
// };

// const fetchUpcomingList = async (datacount, page) => {
//   let res = await http.get(`contents/getupcominglist`, {
//     params: {
//       datacount: datacount,
//       page: page,
//     },
//   });
//   if (res.status === 200) {
//     return res.data;
//   }
// };

// const changeUpcomingStatus = (data) => {
//   return http.post(`contents/changestatus`, {
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//       "Access-Control-Allow-Origin": "*",
//     },
//     data,
//   });
// };
// const trashUpcoming = (data) => {
//   return http.post(`contents/trash/${data}`);
// };

// const UpcomingPageService = {
//   fetchUpcomingList,


// };
// export default UpcomingPageService;
