import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserManagementPageService from "../service/usermanagementpage.service";

const OrganizationFilter = () => {
  // const dispatch = useDispatch();
  // console.log(show);
  const initialOrganizationData = {
    organization_name: "",
    website: "",
    tax_id: "",
    organization_type: "",
  };
  const [organization_data, set_organization_data] = React.useState(
    initialOrganizationData
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_organization_data({ ...organization_data, [name]: value });
  };

  // const handleSubmitOrganizationFilterFunc = () => {
  // 	dispatch(retrieveOrganization(organization_data));
  // }
  // console.log(initialOrganizationData,"initialOrganizationData")

  const handleSubmitOrganizationFilterFunc = () => {
    UserManagementPageService.createOrganization({
      organization_name: organization_data.organization_name,
      website: organization_data.website,
      tax_id: organization_data.tax_id,
      organization_type: organization_data.organization_type,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("organization created");
          window.location.reload("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="card card-primary">
          <form className="card-body">
            <div className="row">
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="organization_name"
                  name="organization_name"
                  placeholder="Enter organization name"
                  value={organization_data.organization_name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="row">
                <div className="mb-2 col-md-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="website"
                    name="website"
                    placeholder="Enter website"
                    value={organization_data.website}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mb-2 col-md-4">
                  <select
                    className="form-select form-select-sm"
                    id="organization_type"
                    name="organization_type"
                    value={organization_data.organization_type}
                    onChange={handleChange}
                  >
                    <option value="">Choose Organization Type</option>
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
                <div className="d-grid gap-2 d-md-flex justify-content-md-right">
                  <button
                    className="btn btn-primary me-md-2 btn-sm"
                    type="button"
                    onClick={handleSubmitOrganizationFilterFunc}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationFilter;
