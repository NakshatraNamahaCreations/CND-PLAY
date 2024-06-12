import React, { useState, forwardRef, useEffect } from "react";
import OFFerPageService from "../service/offercreate.service";

import "react-toastify/dist/ReactToastify.css";
import ContentsPageService from "../../contents/service/contentspage.service";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const OfferOfClubCreate = forwardRef((props, ref) => {
  const initialPlan_SetupData = {
    title: "",
    subtitle: "",
    price: "",
    image: "",
    validity: 0,
    active: false,
    poster: "",
  };

  const [ContentData, setContentData] = useState([]);
  const [SelectedContent, setSelectedContent] = React.useState([]);

  const handleChange1 = (event) => {
    const { value } = event.target;
    setSelectedContent(value);
  };

  const fetchContent = async () => {
    let ContentData1 = await ContentsPageService.fetchContentsAllList();
    setContentData(ContentData1);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [club_create_data, set_club_create_data] = React.useState(
    initialPlan_SetupData
  );
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  React.useImperativeHandle(ref, () => ({
    showOfferCreateChildModal(single_club_create_data) {
      setEdit(true);
      showPlanSetupCreateModal();
      set_club_create_data({
        id: single_club_create_data?.id,
        title: single_club_create_data?.title,
        subtitle: single_club_create_data?.subtitle,
        price: single_club_create_data?.price,
        image: single_club_create_data?.image,
        Contents: single_club_create_data?.Contents,
        validity: single_club_create_data.validity,
        active: single_club_create_data.active,
    
        poster: single_club_create_data.poster,
      });
    },
  }));
  // console.log(club_create_data, "club_create_data");
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_club_create_data({
      ...club_create_data,
      [name]: value,
    });
  };
  const showPlanSetupCreateModal = () => {
    set_club_create_data(initialPlan_SetupData);
    setShowModal("show");
  };
  const showPlanSetupFilter = (status) => {
    set_club_create_data(initialPlan_SetupData);

    setShowFilter(status);
  };
  const hidePlan_SetupCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };
  console.log(SelectedContent, "SelectedContent");
  const handleSubmitNewPlan_SetupCreateFunc = async () => {
    let data = await SelectedContent.map((Ele) => ({
      title: Ele.title,
      contentId: Ele._id,
    }));

    OFFerPageService.creatOffer({
      title: club_create_data?.title,
      subtitle: club_create_data?.subtitle,
      price: club_create_data?.price,
      image: club_create_data?.image,
      validity: club_create_data.validity,
      active: club_create_data.active,
      poster: club_create_data.poster,
      Contents: data,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Club created");
          window.location.reload("");
          setEdit(false);
          setShowModal(false);
          setSubmitted(true);
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSubmitExistingPlan_SetupUpdateFunc = () => {
    if (club_create_data.id) {
      OFFerPageService.updatOffer(club_create_data, club_create_data.id)
        .then((response) => {
          alert("Club updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          // console.error("Error updating Palns ", error);
        });
    } else {
      // console.error("Error: Palns.id is undefined");
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
      {/* <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <PlanSetupFilter /> : ""}</div>
      </div> */}
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
                Create Club
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
              <form name="Plan_setup_form">
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Title</label>
                      <input
                        className="form-control form-control-sm"
                        name="title"
                        defaultValue={club_create_data.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Subtitle </label>
                      <input
                        className="form-control form-control-sm"
                        name="subtitle"
                        defaultValue={club_create_data.subtitle}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label">Banner(Web)</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_user_id"
                        name="image"
                        value={club_create_data.image}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label">Poster(Mob)</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_user_id"
                        name="poster"
                        value={club_create_data.poster}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Price</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_user_id"
                        name="price"
                        value={club_create_data.price}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Validity</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="gateway_business_account_user_id"
                        name="validity"
                        value={club_create_data.validity}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">
                        Select Content - (No. of selected Content{" "}
                        {SelectedContent?.length})
                      </label>
                      <FormControl
                        size="small"
                        sx={{
                          width: 350,
                          padding: "0px",
                          height: "32px",
                          border: "none",
                          backgroundColor: "#2a3038",
                          borderRadius: "10px",
                        }}
                        value={SelectedContent}
                        defaultValue={club_create_data?.Contents}
                      >
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={SelectedContent}
                          onChange={handleChange1}
                          renderValue={(selected) =>
                            selected.map((s) => s.title).join(", ")
                          }
                          MenuProps={MenuProps}
                          className="text-white"
                        >
                          {ContentData.map((cont, index) => (
                            <MenuItem
                              key={`${cont.title}-${index}`}
                              value={cont}
                            >
                              <Checkbox
                                checked={SelectedContent.some(
                                  (item) => item._id === cont._id
                                )}
                              />
                              <ListItemText className="text-white">
                                <span>{cont.title}</span>
                              </ListItemText>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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

export default OfferOfClubCreate;
