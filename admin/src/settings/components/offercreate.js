import React, { useState, forwardRef, useEffect } from "react";
import OFFerPageService from "../service/offercreate.service";
import "react-toastify/dist/ReactToastify.css";
import ContentsPageService from "../../contents/service/contentspage.service";
import Multiselect from "multiselect-react-dropdown";

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

  const [is_edit, setEdit] = useState(false);
  const [ContentData, setContentData] = useState([]);
  const [selectedCatagory, setSelectedCatagory] = useState([]);

  const fetchContent = async () => {
    try {
      const ContentData1 = await ContentsPageService.fetchContentsAllList();
      setContentData(ContentData1);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const [club_create_data, set_club_create_data] = useState(initialPlan_SetupData);
  const [showModal, setShowModal] = useState(false);

  const showPlanSetupCreateModal = () => {
    set_club_create_data(initialPlan_SetupData);
    setSelectedCatagory([]);
    setShowModal(true);
  };

  const hidePlan_SetupCreateModal = () => {
    setEdit(false);
    setShowModal(false);
  };

  const handleSubmitNewPlan_SetupCreateFunc = async () => {
    if (!selectedCatagory || selectedCatagory.length === 0) {
      return alert("Please Select Offer Content");
    }

    const data = selectedCatagory.map((item) => ({
      title: item.title,
      contentId: item.contentId,
    }));

    const payload = {
      title: club_create_data?.title,
      subtitle: club_create_data?.subtitle,
      price: club_create_data?.price,
      image: club_create_data?.image,
      validity: club_create_data?.validity,
      active: club_create_data?.active,
      poster: club_create_data?.poster,
      Contents: data,
    };

    try {
      const response = await OFFerPageService.creatOffer(payload);

      if (response.status === 200) {
        alert("Club created");
        window.location.reload(""); // Consider using React state for updates instead of reloading
        setEdit(false);
        setShowModal(false);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const handleSubmitExistingPlan_SetupUpdateFunc = () => {
    const data = selectedCatagory.map((item) => ({
      title: item.title,
      contentId: item.contentId,
    }));

    const payload = {
      title: club_create_data?.title,
      subtitle: club_create_data?.subtitle,
      price: club_create_data?.price,
      image: club_create_data?.image,
      validity: club_create_data?.validity,
      active: club_create_data?.active,
      poster: club_create_data?.poster,
      Contents: data,
    };

    if (club_create_data.id) {
      OFFerPageService.updatOffer(payload, club_create_data.id)
        .then((response) => {
          alert("Club updated successfully", response);
          window.location.reload("/"); // Consider using React state for updates instead of reloading
        })
        .catch((error) => {
          console.error("Error updating Plans ", error);
        });
    } else {
      console.error("Error: Plans.id is undefined");
    }
  };

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
        validity: single_club_create_data.validity,
        active: single_club_create_data.active,
        poster: single_club_create_data.poster,
        Contents: single_club_create_data?.Contents,
      });
      setSelectedCatagory(single_club_create_data?.Contents || []);
    },
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_club_create_data({
      ...club_create_data,
      [name]: value,
    });
  };

  const onSelectCatagory = (selectedList, selectedItem) => {
    setSelectedCatagory(selectedList);
  };

  const onRemoveCatagory = (selectedList, removedItem) => {
    setSelectedCatagory(selectedList);
  };

  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showPlanSetupCreateModal}
        ></i>
      </div>
      {showModal ? <div className="modal-backdrop fade show"></div> : ""}
      <div
        className={`modal fade f-OpenSans fs-14px ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        id="basic_settingsCreate"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title f-OpenSans fs-14px" id="Plan_setupCreateTitle">
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
                        value={club_create_data.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Subtitle </label>
                      <input
                        className="form-control form-control-sm"
                        name="subtitle"
                        value={club_create_data.subtitle}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Banner(Web)</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
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
                        name="price"
                        value={club_create_data.price}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Validity</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="validity"
                        value={club_create_data.validity}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">
                        Select Content - (No. of selected Content{" "}
                        {selectedCatagory?.length})
                      </label>

                      <Multiselect
                        className="mt-3"
                        options={ContentData.map((ele) => ({
                          title: ele.title,
                          contentId: ele._id,
                        }))}
                        placeholder="Select content"
                        selectedValues={selectedCatagory}
                        onSelect={onSelectCatagory}
                        onRemove={onRemoveCatagory}
                        displayValue="title"
                        showCheckbox={true}
                      />
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
