import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { retrieveBasicSettings } from "../actions/basic_settings";
import BasicSettingsPageService from "../service/basicsettingspage.service";
const BasicSettingsFilter = () => {
  //   const dispatch = useDispatch();

  const initialBasicSettingsData = {
    basic_settings_name: "",
  };
  const [basic_settings_data, set_basic_settings_data] = React.useState(
    initialBasicSettingsData
  );
  const [basic_settings, set_basic_settings] = React.useState();
  useEffect(() => {
    fetchData1();
  }, []);
  const fetchData1 = async () => {
    let basicdata = await BasicSettingsPageService.fetchBasicSettingsList();
    set_basic_settings(basicdata.data);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_basic_settings_data({ ...basic_settings_data, [name]: value });
  };

  const handleSubmitBasicSettingsFilterFunc = () => {
    set_basic_settings(basic_settings_data);
  };

  const handleSubmitBasicSettingsFilterResetFunc = () => {
    set_basic_settings({});
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
                  id="basic_settings_name"
                  name="basic_settings_name"
                  placeholder="Enter basic_settings name"
                  value={basic_settings_data.basic_settings_name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="row">
                <div className="d-grid gap-2 d-md-flex justify-content-md-right">
                  <button
                    className="btn btn-primary me-md-2 btn-sm"
                    type="button"
                    onClick={handleSubmitBasicSettingsFilterFunc}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-primary me-md-2 btn-sm"
                    type="button"
                    onClick={handleSubmitBasicSettingsFilterResetFunc}
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

export default BasicSettingsFilter;
