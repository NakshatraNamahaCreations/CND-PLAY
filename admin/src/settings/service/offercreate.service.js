import http from "../../http-common.function";

const creatOffer = (data) => {
  return http.post(`offer/create`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};


const fetchOfferList = async (datacount, page) => {
  let res = await http.get(`offer/getdata`, {
    params: {
      datacount: datacount,
      page: page,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
};
const updatOffer = (data, idd) => {
  return http.put(`offer/update/${idd}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const changOfferStatus = (data) => {
  return http.post(`offer/changestatus`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};
const trashOffer = (data) => {
  return http.post(`offer/trash/${data}`);
};

const OFFerPageService = {
  fetchOfferList,
  creatOffer,
  updatOffer,
  changOfferStatus,
  trashOffer,
};
export default OFFerPageService;
