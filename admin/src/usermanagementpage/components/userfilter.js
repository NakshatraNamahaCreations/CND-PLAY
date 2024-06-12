import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { retrieveUsers } from "../actions/index";
import UserManagementPageService from "../service/usermanagementpage.service";
import { useState } from "react";
const UserFilter = () => {
  const organization_data = useSelector(
    (state) => state.OrganizationTabReducer,
    shallowEqual
  );
  const [OrganizationData, setOrganizationData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  //   const dispatch = useDispatch();
  const fetchData = async () => {
    let data = await UserManagementPageService.fetchOrganizationList();
    setOrganizationData(data.data);
  };
  const initialUsersData = {
    organization_id: "",
    website: "",
    contact: "",
    organization_type: "",
    email: "",
  };
  const [user_data, set_user_data] = React.useState(initialUsersData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_user_data({ ...user_data, [name]: value });
  };

  const handleSubmitUserFilterFunc = () => {
    UserManagementPageService.createUserManagement(
      JSON.stringify({
        organization_id: user_data.organization_id,
        website: user_data.website,
        organization_type: user_data.organization_type,
        contact: user_data.contact,
        email: user_data.contact_email,
      })
    )
      .then((response) => {
        if (response.status === 200) {
          alert("user created");
          // console.log(response, "Response");
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
              <div className="mb-2 col-md-4">
                <label className="form-label">Choose Organization</label>
                <select
                  className="form-select form-select-sm"
                  id="organization_id"
                  name="organization_id"
                  onChange={handleChange}
                >
                  {organization_data?.length === 0 ? (
                    <option value="">No Organizations</option>
                  ) : organization_data?.data?.length === 0 ? (
                    <option value="">No Organizations</option>
                  ) : (
                    <option value="">Choose Organization</option>
                  )}
                  {OrganizationData?.length === 0
                    ? ""
                    : OrganizationData &&
                      OrganizationData?.map((value, index) => {
                        return (
                          <option key={index} value={value?._id}>
                            {value.organization_name}
                          </option>
                        );
                      })}
                </select>
              </div>
              <div className="mb-2 col-md-4">
                <label className="form-label">Website</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="website"
                  name="website"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mb-2 col-md-4">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="contact"
                  name="contact"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mb-2 col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="contact_email"
                  name="contact_email"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mb-2 col-md-4">
                <label className="form-label">Organization Type</label>
                <select
                  className="form-select form-select-sm"
                  id="organization_type"
                  name="organization_type"
                  onChange={handleChange}
                >
                  <option value="">-select-</option>
                  <option value="Governmental Organization">
                    Governmental Organization
                  </option>
                  <option value="Sobrato Center for Nonprofit Tenant">
                    Sobrato Center for Nonprofit Tenant
                  </option>
                  <option value="Sobrato Foundation">Sobrato Foundation</option>
                </select>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-right">
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={handleSubmitUserFilterFunc}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserFilter;
