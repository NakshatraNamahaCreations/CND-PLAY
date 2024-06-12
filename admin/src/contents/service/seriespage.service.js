// import http from "../../http-common.function";

// const fetchSeriesList = async (datacount, page) => {
//   let res = await http.get(`contents/getserieslist`, {
//     params: {
//       datacount: datacount,
//       page: page,
//     },
//   });
//   if (res.status === 200) {
//     return res.data;
//   }
// };

// const changeSeriesStatus = (data) => {
//   return http.post(`contents/changestatus`, {
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//       "Access-Control-Allow-Origin": "*",
//     },
//     data,
//   });
// };
// const trashSeries = (data) => {
//   return http.post(`contents/trash/${data}`);
// };

// const SeriesPageService = {
//   fetchSeriesList,
//   changeSeriesStatus,
//   trashSeries,
// };
// export default SeriesPageService;
