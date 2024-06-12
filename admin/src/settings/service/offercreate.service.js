import http from "../../http-common.function";

const creatOffer = (data) => {
  return http.post(`offer/create`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const fetchOfferList = async () => {
  let response = await http.get(`offer/getdata`);

  if (response.status === 200) {
    return response.data;
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
  console.log(data,"data===================")
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
