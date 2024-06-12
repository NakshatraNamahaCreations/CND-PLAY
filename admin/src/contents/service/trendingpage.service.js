import http from "../../http-common.function";
// import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

// const fileUpload = (data) => {
//   return httpf.post(`trending/upload`, data);
// };

// Call APIs For Trending

const createTrending = (data) => {
  return http.post(`trending/create`, {
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

const fetchTrendingList = async (datacount, page) => {
  try {
    const res = await http.get(`contents/getrendinglist`, {
      params: {
        datacount: datacount,
        page: page,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const updateTrending = (data, idd) => {
  return http.put(`trending/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changeTrendingStatus = (data) => {
  return http.post(`contents/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};
const trashTrending = (data) => {
  return http.post(`contents/trash/${data}`);
};

const TrendingPageService = {
  fetchTrendingList,
  createTrending,
  updateTrending,
  changeTrendingStatus,
  trashTrending,
};
export default TrendingPageService;
