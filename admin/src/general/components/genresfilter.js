import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveGenres } from "../actions/genres";

const GenresFilter = () => {
  const dispatch = useDispatch();
  const initialGenresData = {
    genres_name: "",
  };
  const [genres_data, set_genres_data] = React.useState(initialGenresData);
  // const [showModal, setShowModal] = useState(false);
  // const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_genres_data({ ...genres_data, [name]: value });
  };

  const handleSubmitGenresFilterFunc = () => {
    dispatch(retrieveGenres(genres_data));
  };

  const handleSubmitGenresFilterResetFunc = () => {
    dispatch(retrieveGenres({}));
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
                  id="genres_name"
                  name="genres_name"
                  placeholder="Enter indie movie name"
                  value={genres_data.genres_name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="row">
                <div className="d-grid gap-2 d-md-flex justify-content-md-right">
                  <button
                    className="btn btn-primary me-md-2 btn-sm"
                    type="button"
                    onClick={handleSubmitGenresFilterFunc}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-primary me-md-2 btn-sm"
                    type="button"
                    onClick={handleSubmitGenresFilterResetFunc}
                  >
                    Reset
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

export default GenresFilter;
