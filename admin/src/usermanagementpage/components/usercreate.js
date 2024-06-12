import React, { useState, useEffect, forwardRef } from "react";

import "react-toastify/dist/ReactToastify.css";
import UserManagementPageService from "../service/usermanagementpage.service";

const UserCreate = forwardRef((props, ref) => {
  const initialUserData = {
    organization_id: "",
    phone: "",
    country: "",
    state: "",
    zip: "",
    address: "",
    username: "",
    password: "",
    plan: "",
    is_admin: "",
    firebase_id: "",
    continueWatching: "",
    purchasedcontent: "",
    Myrating: "",
    Likes: "",
    accountCompleted: "",
    avatar: "",
    createdOn: "",
    district: "",
    email: "",
    lastLogin: "",
    messageToken: "",
    watchingNow: "",
    wishlist: "",
  };
  const [user_data, set_user_data] = React.useState(initialUserData);
  const [showModal, setShowModal] = useState(false);
  const [organization_data, setorganization_data] = useState([]);
  const [is_edit, setEdit] = useState(false);
  React.useImperativeHandle(ref, () => ({
    showUserCreateChildModal(single_user_data) {
      showUserCreateModal();
      setEdit(true);

      set_user_data({
        id: single_user_data.id,

        organization_id: single_user_data.organization_id,
        phone: single_user_data.phone,
        country: single_user_data.country,
        state: single_user_data.state,
        zip: single_user_data.zip,
        address: single_user_data.address,
        username: single_user_data.username,
        password: single_user_data.password,
        plan: single_user_data.plan,
        is_admin: single_user_data.is_admin,
        firebase_id: single_user_data.firebase_id,
        continueWatching: single_user_data.continueWatching,
        purchasedcontent: single_user_data.purchasedcontent,
        Myrating: single_user_data.Myrating,
        Likes: single_user_data.Likes,
        accountCompleted: single_user_data.accountCompleted,
        avatar: single_user_data.avatar,
        createdOn: single_user_data.createdOn,
        district: single_user_data.district,
        email: single_user_data.email,
        lastLogin: single_user_data.lastLogin,
        messageToken: single_user_data.messageToken,
        watchingNow: single_user_data.watchingNow,
        wishlist: single_user_data.wishlist,
      });
    },
  }));

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    set_user_data({ ...user_data, [name]: value });
  };
  const showUserCreateModal = () => {
    set_user_data(initialUserData);
    setShowModal("show");
  };
  const hideUserCreateModal = () => {
    setShowModal("");
    setEdit(false);
  };

  const handleSubmitNewUserCreateFunc = () => {
    UserManagementPageService.createUser(
      JSON.stringify({
        organization_id: user_data.organization_id,
        phone: user_data.phone,
        country: user_data.country,
        state: user_data.state,
        zip: user_data.zip,
        address: user_data.address,
        username: user_data.username,
        password: user_data.password,
        plan: user_data.plan,
        is_admin: user_data.is_admin,
        firebase_id: user_data.firebase_id,
        continueWatching: user_data.continueWatching,
        purchasedcontent: user_data.purchasedcontent,
        Myrating: user_data.Myrating,
        Likes: user_data.Likes,
        accountCompleted: user_data.accountCompleted,
        avatar: user_data.avatar,
        createdOn: user_data.createdOn,
        district: user_data.district,
        email: user_data.email,
        lastLogin: user_data.lastLogin,
        messageToken: user_data.messageToken,
        watchingNow: user_data.watchingNow,
        wishlist: user_data.wishlist,
      })
    )
      .then((response) => {
        if (response.status === 200) {
          alert("user created");

          window.location.reload("/");
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchData = async () => {
    let data = await UserManagementPageService.fetchOrganizationList();
    setorganization_data(data.data);
  };

  const handleSubmitExistingUSerUpdateFunc = () => {
    if (user_data.id) {
      UserManagementPageService.updateuser(user_data, user_data.id)
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
    <div className="mt-1">
      <button
        type="button"
        className="btn btn-primary btn-sm pull-right"
        onClick={showUserCreateModal}
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
        id="userCreate"
        tabIndex="-1"
        aria-labelledby="userCreateTitle"
        aria-hidden="true"
        style={{ display: showModal === "show" ? "block" : "none" }}
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
                onClick={hideUserCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <h6>Organization info :</h6>
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Enter organization</label>
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
                        {organization_data?.length === 0
                          ? ""
                          : organization_data &&
                            organization_data?.map((value, index) => {
                              return (
                                <option key={index} value={value?._id}>
                                  {value.organization_name}
                                </option>
                              );
                            })}
                      </select>
                    </div>
                    {/* <div className="mb-2 col-md-4">
                      <label className="form-label">
                        Enter Liability Waiver
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="liability_waiver"
                        value={user_data.liability_waiver}
                        onChange={handleChange}
                        name="liability_waiver"
                      ></input>
                    </div> */}
                    {/* <div className="mb-2 col-md-4">
                      <label className="form-label">Enter COI</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="coi"
                        value={user_data.coi}
                        onChange={handleChange}
                        name="coi"
                      ></input>
                    </div> */}
                  </div>
                </div>
                <h6>User info :</h6>
                <div className="container">
                  {/* <div className="row">
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Enter Contact</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="contact"
                        value={user_data.contact}
                        onChange={handleChange}
                        name="contact"
                      ></input>
                    </div>
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Contact Title</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="contact_title"
                        value={user_data.contact_title}
                        onChange={handleChange}
                        name="contact_title"
                      ></input>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Contact Email</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="contact_email"
                        value={user_data.email}
                        onChange={handleChange}
                        name="contact_email"
                      ></input>
                    </div>
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Contact Phone</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="contact_phone"
                        value={user_data.phone}
                        onChange={handleChange}
                        name="contact_phone"
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-2 col-md-3">
                      <label className="form-label">Enter Country</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="country"
                        value={user_data.country}
                        onChange={handleChange}
                        name="country"
                      ></input>
                    </div>
                    <div className="mb-2 col-md-3">
                      <label className="form-label">Enter State</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="state"
                        value={user_data.state}
                        onChange={handleChange}
                        name="state"
                      ></input>
                    </div>
                    <div className="mb-2 col-md-3">
                      <label className="form-label">Enter City</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="city"
                        value={user_data.city}
                        onChange={handleChange}
                        name="city"
                      ></input>
                    </div>
                    <div className="mb-2 col-md-3">
                      <label className="form-label">Enter Zip</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="zip"
                        value={user_data.zip}
                        onChange={handleChange}
                        name="zip"
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Address</label>
                      <textarea
                        type="text"
                        className="form-control form-control-sm"
                        id="address"
                        value={user_data.address}
                        onChange={handleChange}
                        name="address"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Enter Username</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="username"
                        value={user_data.username}
                        onChange={handleChange}
                        name="username"
                      ></input>
                    </div>
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Enter Password</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="password"
                        value={user_data.password}
                        onChange={handleChange}
                        name="password"
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control form-control-sm"
                        id="status"
                        value={user_data.status}
                        onChange={handleChange}
                        name="status"
                      >
                        <option value="1">Active</option>
                        <option value="0">In-Active</option>
                      </select>
                    </div>
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Is Admin</label>
                      <select
                        className="form-control form-control-sm"
                        id="is_admin"
                        value={user_data.is_admin}
                        onChange={handleChange}
                        name="is_admin"
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
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
                onClick={hideUserCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewUserCreateFunc}
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

export default UserCreate;
