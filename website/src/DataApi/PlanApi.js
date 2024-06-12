import http from "../http-common.function";

const getAllPlan = async () => {
  try {
    let res = await http.get(`/plans/getalldata`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching trending list:", error);
  }
};

const PlanServicePage = {
  getAllPlan,
};

export default PlanServicePage;
