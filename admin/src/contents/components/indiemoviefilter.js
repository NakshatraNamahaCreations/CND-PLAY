import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import // retrieveIndieMovie,
"../actions/indiemovie";

const IndieMovieFilter = () => {
  const dispatch = useDispatch();
  const initialIndieMovieData = {
    indie_movie_name: "",
  };
  const [indie_movie_data, set_indie_movie_data] = React.useState(
    initialIndieMovieData
  );
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_indie_movie_data({ ...indie_movie_data, [name]: value });
  };

  // const handleSubmitIndieMovieFilterFunc = () => {
  // 	dispatch(retrieveIndieMovie(indie_movie_data));
  // }

  // const handleSubmitIndieMovieFilterResetFunc = () => {
  // 	dispatch(retrieveIndieMovie({}));
  // }
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
                  id="indie_movie_name"
                  name="indie_movie_name"
                  placeholder="Enter indie movie name"
                  value={indie_movie_data.indie_movie_name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="row">
                <div className="d-grid gap-2 d-md-flex justify-content-md-right">
                  <button
                    className="btn btn-primary me-md-2 btn-sm"
                    type="button"
                    // onClick={handleSubmitIndieMovieFilterFunc}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-primary me-md-2 btn-sm"
                    type="button"
                    // onClick={handleSubmitIndieMovieFilterResetFunc}
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

export default IndieMovieFilter;
