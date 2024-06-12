import React, { useState, useEffect, useRef } from "react";

import OrganizationCreate from "./organizationcreate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserManagementPageService from "../service/usermanagementpage.service";
import http from "../../http-common.function";
const OrganizationList = () => {
  const [OrganizationData, setOrganizationData] = useState([]);
  const child = useRef();
  const [dataCount, setDataCount] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let data = await UserManagementPageService.fetchOrganizationList();
    setOrganizationData(data.data);
  };

  const handleChangeStatusOrganizationRecord = (index, status) => {
    UserManagementPageService.changeOrganizationStatus({
      data: {
        status: status,
      },
      filter: { id: index },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        UserManagementPageService.fetchOrganizationList({
          datacount: dataCount,
          page: page,
        });
      })
      .catch((e) => {
       //  console.log(e);
      });
  };
  const handleEditOrganizationRecord = (id) => {
    OrganizationData.forEach((ele) => {
      if (ele._id === id && child.current && ele._id) {
        const { _id, organization_name, website, tax_id } = ele;

        const updatedData = {
          id: _id,
          organization_name: organization_name,
          website: website,
          tax_id: tax_id,
        };

        child.current.showOrganizationCreateModal(updatedData);
      }
    });
  };

  const handleTrashOrganizationRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this organization?`
    );

    if (confirmed) {
      UserManagementPageService.trashOrganization(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("organization  deleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      // console.log("organization  canceled the deletion.");
    }
  };
  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <OrganizationCreate ref={child} />
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="card card-default">
                <div className="card-header">
                  <div className="container-fluid p2">
                    <div className="row">
                      <div className="col-md-6 text-left">
                        <input
                          className="form-control"
                          id="search"
                          name="search"
                        />
                      </div>
                      <div className="col-md-6 text-right">
                        <button className="btn btn-sm btn-primary ">Add</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body table-responsive">
                  <table className="table table-striped fw-600">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Organization Name</th>
                        <th>Website</th>
                        <th>Tax Id</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        OrganizationData.length == 0 ? (
                          <tr>
                            <td colSpan={7} style={{ textAlign: "center" }}>
                              No Data Found
                            </td>
                          </tr>
                        ) : OrganizationData.length == 0 ? (
                          <tr>
                            <td colSpan={7} style={{ textAlign: "center" }}>
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          OrganizationData &&
                          OrganizationData?.map((value, index) => {
                            let { organization_name, website, tax_id, active } =
                              value;
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{organization_name}</td>
                                <td>{website}</td>
                                <td>{tax_id}</td>
                                <td>
                                  {active ? (
                                    <i
                                      className="mdi mdi-checkbox-marked-circle-outline"
                                      onClick={() =>
                                        handleChangeStatusOrganizationRecord(
                                          value?._id,
                                          active ? 0 : 1
                                        )
                                      }
                                    ></i>
                                  ) : (
                                    <i
                                      className="mdi mdi-checkbox-blank-circle-outline"
                                      onClick={() =>
                                        handleChangeStatusOrganizationRecord(
                                          value?._id,
                                          active ? 0 : 1
                                        )
                                      }
                                    ></i>
                                  )}
                                </td>
                                <td>
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-6 text-center">
                                        <button
                                          className="btn btn-sm btn-warning "
                                          onClick={() =>
                                            handleEditOrganizationRecord(
                                              value?._id
                                            )
                                          }
                                        >
                                          Edit
                                        </button>
                                      </div>
                                      <div className="col-md-6 text-center">
                                        <button
                                          className="btn btn-sm btn-warning "
                                          style={{ marginRight: "0" }}
                                          onClick={() =>
                                            handleTrashOrganizationRecord(
                                              value?._id
                                            )
                                          }
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-primary"
                                    type="button"
                                  >
                                    Action
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )
                        // :
                        //   <tr>
                        //     <td colSpan={6} style={{textAlign: 'center'}}>No Data Found</td>
                        //   </tr>
                      }
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

export default OrganizationList;
