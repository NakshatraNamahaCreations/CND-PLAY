import React, { useState, useEffect, useRef } from "react";


import BasicSettingsPageService from "../service/basicsettingspage.service";
import BasicSettingsCreate from "./basicsettingscreate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BasicSettingsList = () => {
  const [basic_settings_data, setbasic_settings_data] = useState([]);
  const child = useRef();

  // const dispatch = useDispatch();
  useEffect(() => {
    fetchData1();
  }, []);
  const fetchData1 = async () => {
    let basicdata = await BasicSettingsPageService.fetchBasicSettingsList();
    setbasic_settings_data(basicdata.data);
  };
  const dataCount = 10;
  const [page, setPage] = useState(1);
  // const handleChangeApproveStatusBasicSettingsRecord = (index, is_approved) => {
  // 	dispatch(updateBasicSettings({
  // 		data: {
  // 			is_approved: is_approved,
  // 		},
  // 		filter: {id: index}
  // 	}))
  // 	.then(data => {
  // 		if (data.data.insertId > 0 || data.data.affectedRows > 0) {
  // 			toast.success(((!is_approved)?'Refused':'Approved')+" Successfully.");
  // 			dispatch(retrieveBasicSettings({is_delete: 0}));
  // 		} else {
  // 			toast.error("Something Wrong. Please try again later.");
  // 		}
  // 	}).catch(e => {
  // 		console.log(e);
  // 	});
  // }
  const handleChangeStatusBasicSettingsRecord = (idd, status) => {
    BasicSettingsPageService.changeBasicSettingsStatus({
      data: {
        status: status,
      },
      filter: { id: idd },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        BasicSettingsPageService.fetchBasicSettingsList({
          datacount: dataCount,
          page: page,
        });
      })
      .catch((e) => {
       //  console.log(e);
        toast.error("Something Wrong. Please try again later.");
      });
  };
  const handleChangePublishStatusBasicSettingsRecord = (
    index,
    is_published
  ) => {
    // dispatch(
    //   updateBasicSettings({
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
    //       dispatch(retrieveBasicSettings({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //    //  console.log(e);
    //   });
  };

  const handleEditBasicSettingsRecord = (id) => {
    if (Array.isArray(basic_settings_data)) {
      basic_settings_data?.forEach((ele) => {
        if (ele._id === id && child.current && ele._id) {
          const {
            _id,
            ch_id,
            basic_settings_type,
            content_type,
            channel_name,
            website,
            chennel_logo,
          } = ele;

          const updatedData = {
            id: _id,
            ch_id: ch_id,
            basic_settings_type: basic_settings_type,
            content_type: content_type,
            channel_name: channel_name,
            website: website,
            chennel_logo: chennel_logo,
          };

          child.current.showBasicSettingsCreateChildModal(updatedData);
        }
      });
    } else {
      console.error("series_data.data is not an array");
    }
  };
  const handleTrashBasicSettingsRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this basic setting?`
    );

    if (confirmed) {
      BasicSettingsPageService.trashBasicSettings(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("Basic setting deleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      // console.log("Basic setting canceled the deletion.");
    }
  };
  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <BasicSettingsCreate ref={child} />
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="card card-default">
                <div className="card-body table-responsive">
                  <table className="table table-striped fw-600">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Channel Name</th>
                        <th>Im Coming from Basic Published</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {basic_settings_data &&
                      basic_settings_data.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : basic_settings_data.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        basic_settings_data &&
                        basic_settings_data.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <img src={value.chennel_logo} />
                              </td>
                              <td style={{ width: "60%" }}>
                                {value.channel_name}
                              </td>
                              <td>
                                {value.is_published ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangePublishStatusBasicSettingsRecord(
                                        value.id,
                                        value.is_published ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangePublishStatusBasicSettingsRecord(
                                        value.id,
                                        value.is_published ? 0 : 1
                                      )
                                    }
                                  ></i>
                                )}
                              </td>
                              <td>
                                {value.status ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusBasicSettingsRecord(
                                        value?._id,
                                        value.status ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusBasicSettingsRecord(
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
                                          handleEditBasicSettingsRecord(
                                            value?._id
                                          )
                                        }
                                      ></i>
                                    </div>
                                    <div className="col-md-6 text-center">
                                      {!value.is_delete ? (
                                        <i
                                          class="mdi mdi-delete-circle"
                                          onClick={() =>
                                            handleTrashBasicSettingsRecord(
                                              value?._id
                                            )
                                          }
                                        ></i>
                                      ) : (
                                        ""
                                      )}
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

export default BasicSettingsList;
