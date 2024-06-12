import React, { useState, useEffect, useRef } from "react";

import PaymentCredentialSetupCreate from "./paymentcredentialsetupcreate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PaymentCredentialSetupPageService from "../service/paymentcredentialsetuppage.service";

const PaymentCredentialSetupList = () => {
  // const paymentcredentialsetup_data = useSelector(state => state.PaymentCredentialSetupReducer, shallowEqual);
  const [paymentcredentialsetup_data, setpaymentcredentialsetup_data] =
    useState([]);
  const child = useRef();
  const dataCount = 10;
  const [page, setPage] = useState(1);
  // const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      is_delete: 0,
    };
    // dispatch(retrievePaymentCredentialSetup(data));
    fetchData();
  }, []);

  const fetchData = async () => {
    let data =
      await PaymentCredentialSetupPageService.fetchPaymentCredentialSetupList();
    setpaymentcredentialsetup_data(data.paymentget);
  };
  const handleChangeStatusPaymentCredentialSetupRecord = (idd, status) => {
    PaymentCredentialSetupPageService.changePaymentCredentialSetupStatus({
      data: {
        status: status,
      },
      filter: { id: idd },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        PaymentCredentialSetupPageService.fetchPaymentCredentialSetupList({
          datacount: dataCount,
          page: page,
        });
      })
      .catch((e) => {
       //  console.log(e);
        toast.error("Something Wrong. Please try again later.");
      });
  };

  const handleChangeApproveStatusPaymentCredentialSetupRecord = (
    index,
    is_approved
  ) => {
    // dispatch(
    //   updatePaymentCredentialSetup({
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
    //       dispatch(retrievePaymentCredentialSetup({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //    //  console.log(e);
    //   });
  };

  const handleChangePublishStatusPaymentCredentialSetupRecord = (
    index,
    is_published
  ) => {
    // dispatch(
    //   updatePaymentCredentialSetup({
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
    //       dispatch(retrievePaymentCredentialSetup({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //    //  console.log(e);
    //   });
  };
  const handleEditPaymentCredentialSetupRecord = (index) => {
    if (child.current) {
      child.current.showPaymentCredentialSetupCreateChildModal(
        paymentcredentialsetup_data.data[index]
      );
    }
  };
  const handleTrashPaymentCredentialSetupRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this payment credential?`
    );

    if (confirmed) {
      PaymentCredentialSetupPageService.trashPaymentCredentialSetup(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("Credentialdeleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      // console.log("Credentialcanceled the deletion.");
    }
  };

  // console.log(paymentcredentialsetup_data)
  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <PaymentCredentialSetupCreate ref={child} />
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="card card-default">
                <div className="card-body table-responsive">
                  <table className="table table-striped fw-600">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Provider</th>
                        <th>User</th>
                        <th>Marchand Id</th>
                        <th>Publish Key</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentcredentialsetup_data &&
                      paymentcredentialsetup_data?.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : paymentcredentialsetup_data?.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        paymentcredentialsetup_data &&
                        paymentcredentialsetup_data?.map((value, index) => {
                          let {
                            _id,
                            gateway_provider,
                            gateway_business_account_user_id,
                            gateway_business_account_marchand_id,
                            gateway_publishable_key,
                          } = value;
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{gateway_provider}</td>
                              <td>{gateway_business_account_user_id}</td>
                              <td>{gateway_business_account_marchand_id}</td>
                              <td>{gateway_publishable_key}</td>

                              <td>
                                {value.status ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusPaymentCredentialSetupRecord(
                                        value?._id,
                                        value.status ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusPaymentCredentialSetupRecord(
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
                                          handleEditPaymentCredentialSetupRecord(
                                            _id
                                          )
                                        }
                                      ></i>
                                    </div>
                                    <div className="col-md-6 text-center">
                                      <i
                                        class="mdi mdi-delete-circle"
                                        onClick={() =>
                                          handleTrashPaymentCredentialSetupRecord(
                                            _id
                                          )
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

export default PaymentCredentialSetupList;
