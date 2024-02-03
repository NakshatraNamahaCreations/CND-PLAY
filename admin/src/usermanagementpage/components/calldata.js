import { useEffect, useState } from "react";
import UserManagementPageService from "../service/usermanagementpage.service";
import { useLocation } from "react-router-dom";
import ContentsPageService from "../../general/service/districtspage.service";
const useCalldata = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const [disctric, setdisctric] = useState([]);
  const [userFilterData, setUserFilterData] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (location.pathname === "/orgnaization") {
          response = await ContentsPageService.fetchDistrictsList();
          setdisctric(response);
          setUserFilterData(response.data);
        } else if (location.pathname === "/usercreate") {
          response = await UserManagementPageService.fetchUserList();
          setUserFilterData(response.data);
        } else if (location.pathname === "/userfilter") {
          response = await UserManagementPageService.fetchOrganizationList();
          setOrganizationData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location.pathname]);

  return {
    organizationData,
    disctric,
    userFilterData,
  };
};

export default useCalldata;
