import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Files from "react-files";
import PaymentCredentialSetupFilter from "./paymentcredentialsetupfilter";
import PaymentCredentialSetupPageService from "../service/paymentcredentialsetuppage.service";
// import {
//     retrieveProject,
//     fileUpload,
// } from "../actions/basic_settings";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentCredentialSetupCreate = forwardRef((props, ref) => {
  const paymentcredentialsetup_project_data = useSelector(
    (state) => state.ProjectReducer,
    shallowEqual
  );
  const [file, setFile] = useState();
  // const insert_response = useSelector(state => state.PaymentCredentialSetupReducer, shallowEqual);
  const file_upload_response = useSelector(
    (state) => state.FileUploadReducer,
    shallowEqual
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  // 	let data = {
  // 		// status: 1,
  // 		is_delete: 0
  // 	};
  // 	dispatch(retrieveProject(data));
  // }, []);

  // console.log(show);
  const initialPaymentCredentialSetupData = {
    ch_id: "1",
    gateway_provider: "payu",
    gateway_business_account_user_id: "",
    gateway_business_account_password: "",
    gateway_business_account_marchand_id: "",
    gateway_business_account_sandbox_id: "",
    gateway_publishable_key: "",
    gateway_secret_key: "",
  };

  const [paymentcredentialsetup_data, set_paymentcredentialsetup_data] =
    React.useState(initialPaymentCredentialSetupData);
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  React.useImperativeHandle(ref, () => ({
    showPaymentCredentialSetupCreateChildModal(
      single_paymentcredentialsetup_data
    ) {
      setEdit(true);
      showPaymentCredentialSetupCreateModal();
      set_paymentcredentialsetup_data({
        id: single_paymentcredentialsetup_data?.id,
        ch_id: single_paymentcredentialsetup_data?.ch_id,
        gateway_provider: single_paymentcredentialsetup_data?.gateway_provider,
        gateway_business_account_user_id:
          single_paymentcredentialsetup_data?.gateway_business_account_user_id,
        gateway_business_account_password:
          single_paymentcredentialsetup_data?.gateway_business_account_password,
        gateway_business_account_marchand_id:
          single_paymentcredentialsetup_data?.gateway_business_account_marchand_id,
        gateway_business_account_sandbox_id:
          single_paymentcredentialsetup_data?.gateway_business_account_sandbox_id,
        gateway_publishable_key:
          single_paymentcredentialsetup_data?.gateway_publishable_key,
        gateway_secret_key:
          single_paymentcredentialsetup_data?.gateway_secret_key,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_paymentcredentialsetup_data({
      ...paymentcredentialsetup_data,
      [name]: value,
    });
  };
  const showPaymentCredentialSetupCreateModal = () => {
    set_paymentcredentialsetup_data(initialPaymentCredentialSetupData);
    setShowModal("show");
  };
  const showPaymentCredentialSetupFilter = (status) => {
    set_paymentcredentialsetup_data(initialPaymentCredentialSetupData);
    // setShowModal('show');
    setShowFilter(status);
  };
  const hidePaymentCredentialSetupCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };

  const handleSubmitNewPaymentCredentialSetupCreateFunc = () => {
    PaymentCredentialSetupPageService.createPaymentCredentialSetup(
		{
      ch_id: paymentcredentialsetup_data?.ch_id,
      gateway_provider: paymentcredentialsetup_data?.gateway_provider,
      gateway_business_account_user_id:
        paymentcredentialsetup_data?.gateway_business_account_user_id,
      gateway_business_account_password:
        paymentcredentialsetup_data?.gateway_business_account_password,
      gateway_business_account_marchand_id:
        paymentcredentialsetup_data?.gateway_business_account_marchand_id,
      gateway_business_account_sandbox_id:
        paymentcredentialsetup_data?.gateway_business_account_sandbox_id,
      gateway_publishable_key:
        paymentcredentialsetup_data?.gateway_publishable_key,
      gateway_secret_key: paymentcredentialsetup_data?.gateway_secret_key,
    }
	)
      .then((response) => {
        if (response.status === 200) {
          alert("payment credential created");
          window.location.reload("/");
          setEdit(false);
          setShowModal(false);
          setSubmitted(true);
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSubmitExistingPaymentCredentialSetupUpdateFunc = () => {
    if (paymentcredentialsetup_data.id) {
      PaymentCredentialSetupPageService.updatePaymentCredentialSetup(
        paymentcredentialsetup_data,
        paymentcredentialsetup_data.id
      )
        .then((response) => {
          alert("paymentgetway updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating paymentgetway ", error);
        });
    } else {
      console.error("Error: paymentgetway.id is undefined");
    }
  };

  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showPaymentCredentialSetupFilter(!showFilter)}
        ></i>
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showPaymentCredentialSetupCreateModal}
        ></i>
      </div>
      <div className="mt-2 mb-2 container-fluid">
        <div className="row">
          {showFilter ? <PaymentCredentialSetupFilter /> : ""}
        </div>
      </div>
      {showModal == "show" ? (
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
                id="paymentcredentialsetupCreateTitle"
              >
                Create PaymentCredentialSetup
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hidePaymentCredentialSetupCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="paymentcredentialsetup_form">
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Provider</label>
                      <select
                        className="form-select "
                        id="gateway_provider"
                        name="gateway_provider"
                        onChange={handleChange}
                      >
                        <option value=""> - Choose Provider - </option>
                        <option
                          value="payu"
                          selected={
                            paymentcredentialsetup_data.gateway_provider ===
                            "payu"
                              ? true
                              : false
                          }
                        >
                          {" "}
                          PayU{" "}
                        </option>
                        {/* <option value="stripe"> Stripe </option>
												<option value="square"> Square </option> */}
                      </select>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">
                        Provider Account Username
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_user_id"
                        name="gateway_business_account_user_id"
                        value={
                          paymentcredentialsetup_data.gateway_business_account_user_id
                        }
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">
                        Provider Account Password
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_password"
                        name="gateway_business_account_password"
                        value={
                          paymentcredentialsetup_data.gateway_business_account_password
                        }
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Provider Marchant ID</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_marchand_id"
                        name="gateway_business_account_marchand_id"
                        value={
                          paymentcredentialsetup_data.gateway_business_account_marchand_id
                        }
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Provider Sandbox ID</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_sandbox_id"
                        name="gateway_business_account_sandbox_id"
                        value={
                          paymentcredentialsetup_data.gateway_business_account_sandbox_id
                        }
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Provider Publish Key</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_publishable_key"
                        name="gateway_publishable_key"
                        value={
                          paymentcredentialsetup_data.gateway_publishable_key
                        }
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Provider Secret Key</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_secret_key"
                        name="gateway_secret_key"
                        value={paymentcredentialsetup_data.gateway_secret_key}
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
                onClick={hidePaymentCredentialSetupCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewPaymentCredentialSetupCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingPaymentCredentialSetupUpdateFunc}
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

export default PaymentCredentialSetupCreate;
