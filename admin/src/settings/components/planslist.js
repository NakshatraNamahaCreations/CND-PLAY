import React, { useState, useEffect, useRef } from "react";
import CreatePlansSetupCreate from "./planscreate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlanSetupPageService from "../service/planscreate.service";

const PlanSetupList = () => {
  // const Plansetup_data = useSelector(state => state.PlanSetupReducer, shallowEqual);
  const [Plansetup_data, setPlansetup_data] = useState([]);
  const child = useRef();
  const dataCount = 10;
  const [page, setPage] = useState(1);

  // console.log();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = await PlanSetupPageService.fetchPlanSetupList();
    setPlansetup_data(data.data);
  };
  const handleChangeStatusPlanSetupRecord = (idd, status) => {
    PlanSetupPageService.changePlanSetupStatus({
      data: {
        status: status,
      },
      filter: { id: idd },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        PlanSetupPageService.fetchPlanSetupList({
          datacount: dataCount,
          page: page,
        });
      })
      .catch((e) => {
       //  console.log(e);
        toast.error("Something Wrong. Please try again later.");
      });
  };

  const handleChangeApproveStatusPlanSetupRecord = (index, is_approved) => {
    // dispatch(
    //   updatePlanSetup({
    //     data: {
    //       is_approved: is_approved,
    //     },
    //     filter: { id: index },
    //   })
    // )
    //   .then((data) => {
    //     if (data.data.insertId > 0 || data.data.affectedRows > 0) {
    //       toast.success(
    //         (!is_approved ? "Refused" : "Approved") + " Successfully."
    //       );
    //       dispatch(retrievePlanSetup({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //    //  console.log(e);
    //   });
  };

  const handleChangePublishStatusPlanSetupRecord = (index, is_published) => {
    // dispatch(
    //   updatePlanSetup({
    //     data: {
    //       is_published: is_published,
    //     },
    //     filter: { id: index },
    //   })
    // )
    //   .then((data) => {
    //     if (data.data.insertId > 0 || data.data.affectedRows > 0) {
    //       toast.success(
    //         (!is_published ? "Publishment Suppressed" : "Published") +
    //           " Successfully."
    //       );
    //       dispatch(retrievePlanSetup({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //    //  console.log(e);
    //   });
  };

  const handleEditPlanSetupRecord = (id) => {
    Plansetup_data.forEach((ele) => {
      if (ele._id === id && child.current && ele._id) {
        const {
          _id,
          planType,
          validity,
          amount,
          videoQuality,
          active,
          device,
        } = ele;

        const updatedData = {
          id: _id,
          planType: planType,
          validity: validity,
          amount: amount,
          videoQuality: videoQuality,
          dataCount,
          page,
          active,
          device,
        };
        // console.log(updatedData, "updatedData");
        child.current.showPlanSetupCreateChildModal(updatedData);
      }
    });
  };
  const handleTrashPlanSetupRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this plan?`
    );

    if (confirmed) {
      PlanSetupPageService.trashPlanSetup(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("plan succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.log("plan the deletion.");
    }
  };

  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <CreatePlansSetupCreate ref={child} />
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="card card-default">
                <div className="card-body table-responsive">
                  <table className="table table-striped fw-600">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>PlanType</th>
                        <th>Validity</th>
                        <th>Amount</th>
                        <th>Video Quality</th>
                        <th>Device</th>
                        
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Plansetup_data && Plansetup_data?.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : Plansetup_data?.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        Plansetup_data &&
                        Plansetup_data?.map((value, index) => {
                          let {
                            _id,
                            planType,
                            validity,
                            amount,
                            videoQuality,device
                          } = value;
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{planType}</td>
                              <td>{validity}</td>
                              <td>{amount}</td>
                              <td>{videoQuality}</td>
                              <td>{device}</td>
                              <td>
                                {value.status ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusPlanSetupRecord(
                                        value?._id,
                                        value.status ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusPlanSetupRecord(
                                        value?._id,
                                        value.status ? 0 : 1
                                      )
                                    }
                                  ></i>
                                )}
                              </td>
                              <td>
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-md-6 text-center">
                                      <i
                                        class="mdi mdi-pencil-circle-outline"
                                        onClick={() =>
                                          handleEditPlanSetupRecord(value?._id)
                                        }
                                      ></i>
                                    </div>
                                    <div className="col-md-6 text-center">
                                      <i
                                        class="mdi mdi-delete-circle"
                                        onClick={() =>
                                          handleTrashPlanSetupRecord(_id)
                                        }
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSetupList;
