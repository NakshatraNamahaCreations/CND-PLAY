


import http from "../http-common.function";

const getGoldAllPlan = async () => {
    try {
        let res = await http.get(`/plans/getalldata`);
      

        let data = res.data.data.filter((ele) => ele.planType === "Gold")
        if (res.status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error fetching trending list:", error);
    }
};

const getSilverAllPlan = async () => {
    try {
        let res = await http.get(`/plans/getalldata`);
      

        let data = res.data.data.filter((ele) => ele.planType === "Silver")
        if (res.status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error fetching trending list:", error);
    }
};

const getPlatinumAllPlan = async () => {
    try {
        let res = await http.get(`/plans/getalldata`);
        
        let data = res.data.data.filter((ele) => ele.planType === "Platinum")
        if (res.status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error fetching trending list:", error);
    }
};



const PlanServicePage = {
    getGoldAllPlan
    ,
    getSilverAllPlan,
    getPlatinumAllPlan
};

export default PlanServicePage;

