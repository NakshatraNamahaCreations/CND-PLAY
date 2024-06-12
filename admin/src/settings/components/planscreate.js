import React, { useState, forwardRef } from "react";

import PlanSetupFilter from "./plansfilter";
import PlansSetupPageService from "../service/planscreate.service";

import "react-toastify/dist/ReactToastify.css";

const CreatePlansSetupCreate = forwardRef((props, ref) => {
  const initialPlan_SetupData = {
    planType: "",
    validity: "",
    amount: "",
    videoQuality: "",
    device: "",
  };

  const [Plan_setup_data, set_Plan_setup_data] = React.useState(
    initialPlan_SetupData
  );
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  React.useImperativeHandle(ref, () => ({
    showPlanSetupCreateChildModal(single_Plan_setup_data) {
      setEdit(true);
      showPlanSetupCreateModal();
      set_Plan_setup_data({
        id: single_Plan_setup_data?.id,
        planType: single_Plan_setup_data?.planType,
        validity: single_Plan_setup_data?.validity,
        amount: single_Plan_setup_data?.amount,
        videoQuality: single_Plan_setup_data?.videoQuality,
        device: single_Plan_setup_data?.device,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_Plan_setup_data({
      ...Plan_setup_data,
      [name]: value,
    });
  };
  const showPlanSetupCreateModal = () => {
    set_Plan_setup_data(initialPlan_SetupData);
    setShowModal("show");
  };
  const showPlanSetupFilter = (status) => {
    set_Plan_setup_data(initialPlan_SetupData);

    setShowFilter(status);
  };
  const hidePlan_SetupCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };

  const handleSubmitNewPlan_SetupCreateFunc = () => {
    PlansSetupPageService.createPlanSetup({
      planType: Plan_setup_data?.planType,
      validity: Plan_setup_data?.validity,
      amount: Plan_setup_data?.amount,
      videoQuality: Plan_setup_data?.videoQuality,
      device: Plan_setup_data?.device,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Plan created");
          window.location.reload("/");
          setEdit(false);
          setShowModal(false);
          setSubmitted(true);
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSubmitExistingPlan_SetupUpdateFunc = () => {
    if (Plan_setup_data.id) {
      PlansSetupPageService.updatePlanSetup(Plan_setup_data, Plan_setup_data.id)
        .then((response) => {
          alert("Palns updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating Palns ", error);
        });
    } else {
      console.error("Error: Palns.id is undefined");
    }
  };

  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        {/* <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showPlanSetupFilter(!showFilter)}
        ></i> */}
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showPlanSetupCreateModal}
        ></i>
      </div>
      <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <PlanSetupFilter /> : ""}</div>
      </div>
      {showModal === "show" ? (
        <div className="modal-backdrop fade show"></div>
      ) : (
        ""
      )}
      <div
        className={`modal fade f-OpenSans fs-14px ${showModal} `}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        id="basic_settingsCreate"
        style={{ display: showModal === "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="Plan_setupCreateTitle"
              >
                Create Plan
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hidePlan_SetupCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="Plan_setup_form">
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Plan Type</label>
                      <select
                        className="content_section_data form-select"
                        name="planType"
                        defaultValue={Plan_setup_data.planType}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Plan Type - </option>
                        <option
                          selected={
                            Plan_setup_data.planType === "Silver" ? true : false
                          }
                          value="Silver"
                        >
                          Silver
                        </option>

                        <option
                          selected={
                            Plan_setup_data.planType === "Gold" ? true : false
                          }
                          value="Gold"
                        >
                          Gold
                        </option>

                        <option
                          selected={
                            Plan_setup_data.planType === "Platinum"
                              ? true
                              : false
                          }
                          value="Platinum"
                        >
                          Platinum
                        </option>
                      </select>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Device Type</label>
                      <select
                        className="content_section_data form-select"
                        name="device"
                        defaultValue={Plan_setup_data.device}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Device Type - </option>
                        {Plan_setup_data.planType === "Silver" && (
                          <option
                            selected={
                              Plan_setup_data.device === "mobile" ? true : false
                            }
                            value="mobile"
                          >
                            Mobile
                          </option>
                        )}
                        {Plan_setup_data.planType === "Gold" && (
                          <option
                            selected={
                              Plan_setup_data.device === "Mobile, TV, Web"
                                ? true
                                : false
                            }
                            value="Mobile, TV, Web"
                          >
                            Mobile, TV, Web
                          </option>
                        )}

                        {Plan_setup_data.planType === "Platinum" && (
                          <option
                            selected={
                              Plan_setup_data.device === "Mobile, TV, Web"
                                ? true
                                : false
                            }
                            value="Mobile, TV, Web"
                          >
                            Mobile, TV, Web
                          </option>
                        )}
                      </select>
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label">validity</label>
                      <select
                        className="content_section_data form-select"
                        name="validity"
                        value={Plan_setup_data.validity}
                        onChange={handleChange}
                      >
                        <option value=""> - Select validity - </option>
                        <option
                          selected={
                            Plan_setup_data.planType === "90" ? true : false
                          }
                          value="90"
                        >
                          90 days
                        </option>

                        <option
                          selected={
                            Plan_setup_data.planType === "180" ? true : false
                          }
                          value="180"
                        >
                          180 days
                        </option>

                        <option
                          selected={
                            Plan_setup_data.planType === "360" ? true : false
                          }
                          value="360"
                        >
                          365 days
                        </option>
                      </select>{" "}
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label">Video Quality</label>
                      <select
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_user_id"
                        name="videoQuality"
                        value={Plan_setup_data.videoQuality}
                        onChange={handleChange}
                      >
                        <option value=""> - Select videoQuality - </option>
                        <option
                          selected={
                            Plan_setup_data.planType === "480p" ? true : false
                          }
                          value="480p"
                        >
                          480p
                        </option>

                        <option
                          selected={
                            Plan_setup_data.planType === "720p" ? true : false
                          }
                          value="720p"
                        >
                          720p
                        </option>

                        <option
                          selected={
                            Plan_setup_data.planType === "1080p" ? true : false
                          }
                          value="1080p"
                        >
                          1080p
                        </option>
                      </select>{" "}
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Price</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_user_id"
                        name="amount"
                        value={Plan_setup_data.amount}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default f-OpenSans fs-12px"
                data-bs-dismiss="modal"
                onClick={hidePlan_SetupCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewPlan_SetupCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingPlan_SetupUpdateFunc}
                >
                  Update changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreatePlansSetupCreate;
