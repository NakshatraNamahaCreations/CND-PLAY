import React, { useState, forwardRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import UserManagementPageService from "../service/usermanagementpage.service";

const OrganizationCreate = forwardRef((props, ref) => {

  const initialOrganizationData = {
    organization_name: "",
    website: "",
    tax_id: "",
    organization_type: "",
  };
  const [organization_data, set_organization_data] = React.useState(
    initialOrganizationData
  );
  const [showModal, setShowModal] = useState(false);
  const [Edit, setEdit] = useState(false);
  React.useImperativeHandle(ref, () => ({
    showOrganizationCreateModal(single_user_data) {
      showOrganizationCreateModal();
      setEdit(true);
      console.log("single_user_data", single_user_data);
      set_organization_data({
        id: single_user_data.id,
        sl_m_user_profile: single_user_data.sl_m_user_profile,
        organization_id: single_user_data.organization_id,
        liability_waiver: single_user_data.liability_waiver,
        coi: single_user_data.coi,
        contact: single_user_data.contact,
        contact_title: single_user_data.contact_title,
        contact_email: single_user_data.contact_email,
        contact_phone: single_user_data.contact_phone,
        country: single_user_data.country,
        state: single_user_data.state,
        city: single_user_data.city,
        zip: single_user_data.zip,
        address: single_user_data.address,
        username: single_user_data.username,
        password: single_user_data.password,
        status: single_user_data.status,
        is_admin: single_user_data.is_admin,
      });
    },
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_organization_data({ ...organization_data, [name]: value });
  };
  const showOrganizationCreateModal = () => {
    set_organization_data(initialOrganizationData);
    setShowModal("show");
  };
  const hideOrganizationCreateModal = () => {
    setShowModal("");
  };

  const handleSubmitNewOrganizationCreateFunc = () => {
    UserManagementPageService.createOrganization(
      JSON.stringify({
        organization_name: organization_data.organization_name,
        website: organization_data.website,
        tax_id: organization_data.tax_id,
        organization_type: organization_data.organization_type,
      })
    )
      .then((response) => {
        if (response.status === 200) {
          alert("organization created");
          window.location.reload("/");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSubmitExistingUSerUpdateFunc = () => {
    if (organization_data.id) {
      UserManagementPageService.updateOrganization(
        organization_data,
        organization_data.id
      )
        .then((response) => {
          alert("user updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    } else {
      console.error("Error: user.id is undefined");
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-sm pull-right mt-1 mb-1"
        onClick={showOrganizationCreateModal}
      >
        Create
      </button>
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
        id="organizationCreate"
        style={{ display: showModal == "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userCreateTitle">
                Create User Management
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideOrganizationCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="organization_form">
                <div className="container">
                  <div className="mb-2">
                    <label className="form-label">Organization Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="organization_name"
                      name="organization_name"
                      value={organization_data.organization_name}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Website</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="website"
                      name="website"
                      value={organization_data.website}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Tax ID</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="tax_id"
                        name="tax_id"
                        value={organization_data.tax_id}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Organization Type</label>
                      <select
                        className="form-select form-select-sm"
                        id="organization_type"
                        name="organization_type"
                        value={organization_data.organization_type}
                        onChange={handleChange}
                      >
                        <option value="">-select-</option>
                        <option value="Governmental Organization">
                          Governmental Organization
                        </option>
                        <option value="Sobrato Center for Nonprofit Tenant">
                          Sobrato Center for Nonprofit Tenant
                        </option>
                        <option value="Sobrato Foundation">
                          Sobrato Foundation
                        </option>
                      </select>
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
                onClick={hideOrganizationCreateModal}
              >
                Close
              </button>
              {!Edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewOrganizationCreateFunc}
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingUSerUpdateFunc}
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

export default OrganizationCreate;
