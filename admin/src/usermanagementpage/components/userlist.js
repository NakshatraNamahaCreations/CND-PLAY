import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
import UserCreate from "./usercreate";
// import { deleteUser, updateUser, retrieveUsers } from "../actions/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserManagementPageService from "../service/usermanagementpage.service";
import http from "../../http-common.function";
const UserList = () => {
  const child = useRef();
  const [user_data, setuser_data] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let data = await UserManagementPageService.fetchUserList();
    setuser_data(data.data);
  };

  const handleChangeStatusUserRecord = (idd) => {
    const userToUpdate = user_data.find((ele) => ele._id === idd);

    if (userToUpdate && userToUpdate._id) {
      let UpdateStatus = userToUpdate.status == 0 ? 1 : 0;

      UserManagementPageService.updateuser(
        {
          status: UpdateStatus,
        },
        userToUpdate._id
      )
        .then((data) => {
          if (data.res > 0 || data.count === 1) {
            toast.success(data.msg);
          } else {
            toast.error(data.msg);
          }
        })
        .catch((error) => {
          console.error("Error updating user status:", error);
          toast.error("An error occurred while updating user status.");
        })
        .finally(() => {
          UserManagementPageService.fetchUserList({});
        });
    } else {
      console.error("User not found or _id is undefined.");
    }
  };

  const handleEditUserRecord = (id) => {
    user_data.forEach((ele) => {
      if (ele._id === id && child.current && ele._id) {
        const { _id, username, contact_email } = ele;
        const updatedData = {
          id: _id,
          username: username,
          contact_email: contact_email,
        };
        child.current.showUserCreateChildModal(updatedData);
      }
    });
  };

  const handleTrashUserRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this user?`
    );

    if (confirmed) {
      UserManagementPageService.trashUser(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("user  deleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.log("user  canceled the deletion.");
    }
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mt-2">
            <UserCreate ref={child} />
          </div>
          <div className="col-md-12 mt-2">
            <div className="row">
              <div className="card card-default">
                <div className="card-body table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user_data?.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : user_data?.data?.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        user_data &&
                        user_data?.map((value, index) => {
                          let { username, contact_email } = value;
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{username}</td>
                              <td>{contact_email}</td>
                              <td>
                                <button
                                  className={`btn btn-sm ${
                                    value.status == 1
                                      ? "btn-success"
                                      : "btn-danger"
                                  } `}
                                  onClick={() =>
                                    handleChangeStatusUserRecord(value?._id)
                                  }
                                >
                                  {value.status == 1 ? "Active" : "Inactive"}
                                </button>
                              </td>
                              <td>
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-md-6 text-center">
                                      <button
                                        className="btn btn-sm me-4 btn-success "
                                        onClick={() =>
                                          handleEditUserRecord(value?._id)
                                        }
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() =>
                                          handleTrashUserRecord(value?._id)
                                        }
                                      >
                                        Delete
                                      </button>
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

export default UserList;
