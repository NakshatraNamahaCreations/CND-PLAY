import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import http from "../../http-common.function";

import DistrictsPageService from "../service/districtspage.service";
const LanguageCreate = forwardRef((props, ref) => {
  const [dataCount, setDataCount] = useState(5);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const initialdLangaugeData = {
    // order: "",
    language: "",
  };

  const [Language, set_Language] = React.useState(initialdLangaugeData);
  const [showModal, setShowModal] = useState(false);
  // const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);

  React.useImperativeHandle(ref, () => ({
    showdLangaugeCreateChildModal(single_Language) {
      setEdit(true);
      showdLangaugeCreateModal();
      setDataCount(single_Language.dataCount);
      setPage(single_Language.page);
      set_Language({
        id: single_Language.id,
        // order: single_Language.data.order,
        language: single_Language.data.language,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_Language({ ...Language, [name]: value });
  };
  const showdLangaugeCreateModal = () => {
    set_Language(initialdLangaugeData);
    setShowModal("show");
  };

  const hidedLangaugeCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };

  const handleSubmitNewdLangaugeCreateFunc = async () => {
    try {
      const config = {
        url: `language/create`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: { lang: Language.lang },
      };

      let res = await http(config);

      if (res.status === 200) {
        alert("Successfully saved");
        window.location.reload("/");
      } else {
        // console.log("Unexpected response:", config);
      }
    } catch (error) {
      // console.error("Error while saving:", error);
    }
  };
  const handleSubmitExistingdLangaugeUpdateFunc = () => {
    if (Language.id) {
      DistrictsPageService.updatelanguage(Language, Language.id)
        .then((response) => {
          alert("Language movie updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          // console.error("Error updating Language event", error);
        });
    } else {
      // console.error("Error: Language.id is undefined");
    }
  };
  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        {/* <i className="mdi mdi-filter-variant float-right mr-2"  onClick={() => showdLangaugeFilter(!showFilter)}></i> */}
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showdLangaugeCreateModal}
        ></i>
      </div>
      {/* <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <dLangaugeFilter /> : ""}</div>
      </div> */}
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
        id="dLangauge_create"
        style={{ display: showModal == "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="dLangauge_create_title"
              >
                Create dLangauge
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hidedLangaugeCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="dLangauge_form">
                <div className="container-fluid">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Language </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="lang"
                        name="lang"
                        value={Language.lang}
                        onChange={handleChange}
                      ></input>
                    </div>
                    {/* <div className="mb-2 col-md-12">
                      <label className="form-label">Order</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="order"
                        name="order"
                        value={Language.order}
                        onChange={handleChange}
                      ></input>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default f-OpenSans fs-12px"
                data-bs-dismiss="modal"
                onClick={hidedLangaugeCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewdLangaugeCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingdLangaugeUpdateFunc}
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

export default LanguageCreate;
