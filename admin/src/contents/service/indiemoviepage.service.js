// import http from "../../http-common.function";
// import httpf from "../../http-file-upload.function";
// var sha1 = require("sha1");

// // Call APIs For IndieMovie

// const createIndieMovie = (data) => {
//   return http.post(`indiemovie/create`, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     data,
//   });
// };
// const fetchIndieMovieList = async (datacount, page) => {
//   let res = await http.get(`contents/getindiamovlist`, {
//     params: {
//       datacount: datacount,
//       page: page,
//     },
//   });
//   if (res.status === 200) {
//     return res.data;
//   }
// };
// const updateIndieMovie = (data, idd) => {
//   return http.put(`indiemovie/update/${idd}`, data, {
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//       "Access-Control-Allow-Origin": "*",
//     },
//   });
// };
// const changeIndieMovieStatus = (data) => {
//   return http.post(`contents/changestatus`, data, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };
// const trashIndieMovie = (idd) => {
//   return http.post(`contents/trash/${idd}`);
// };

// const IndieMoviePageService = {
//   fetchIndieMovieList,
//   createIndieMovie,
//   updateIndieMovie,
//   changeIndieMovieStatus,
//   trashIndieMovie,
// };
// export default IndieMoviePageService;
