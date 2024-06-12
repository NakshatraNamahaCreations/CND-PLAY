import http from "../../http-common.function";
import httpf from "../../http-file-upload.function";
var sha1 = require("sha1");

const fileUpload = (data) => {
  return httpf.post(`contents/upload`, data);
};

// Call APIs For Contents

const createContents = (data) => {
  return http.post(`contents/create`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const fetchContentsList = async (datacount, page) => {
  try {
    let res = await http.get(`contents/list`, {
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

const updateContents = (data, id) => {
  return http.put(`contents/update/${id}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const changeContentsStatus = (data) => {
  return http.post(`contents/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

const trashContents = (idd) => {
  return http.post(`contents/trash/${idd}`);
};

const fetchContentsAllList = async () => {
  try {
    let listOfMovie = await http.get(`contents/getdata`);
    if (listOfMovie.status === 200) {
      return listOfMovie.data.data;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const fetchUpcomingList = async (datacount, page) => {
  let res = await http.get(`contents/getupcominglist`, {
    params: {
      datacount: datacount,
      page: page,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
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
const fetchIndieMovieList = async (datacount, page) => {
  let res = await http.get(`contents/getindiamovlist`, {
    params: {
      datacount: datacount,
      page: page,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
};
const fetchSeriesList = async (datacount, page) => {
  let res = await http.get(`contents/getserieslist`, {
    params: {
      datacount: datacount,
      page: page,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
};
const ContentsPageService = {
  fetchContentsList,
  fileUpload,
  createContents,
  updateContents,
  changeContentsStatus,
  trashContents,
  fetchContentsAllList,
  fetchUpcomingList,
  fetchTrendingList,
  fetchIndieMovieList,
  fetchSeriesList,
};
export default ContentsPageService;
