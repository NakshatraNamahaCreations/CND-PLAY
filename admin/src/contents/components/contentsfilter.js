// ContentsFilter.js
import React, { useState } from "react";
import ContentsPageService from "../service/contentspage.service";

const ContentsFilter = ({ onFilter }) => {
  const initialContentsData = {
    contents_name: "",
    datacount: 1,
    page: 1,
  };

  const [contents_data, set_contents_data] = useState(initialContentsData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_contents_data({ ...contents_data, [name]: value });
  };

  const handleSubmitContentsFilterFunc = async () => {
    try {
      const contentfilter = await ContentsPageService.fetchContentsList({
        datacount: contents_data.datacount,
        page: contents_data.page,
        contents_name: contents_data.contents_name,
      });
      // console.log();
      onFilter(contentfilter.data);
    } catch (error) {
      console.error("Error fetching content list:", error);
    }
  };

  const handleSubmitContentsFilterResetFunc = async () => {
    try {
      const contentfilter = await ContentsPageService.fetchContentsList(
        5,
        1,
        {}
      );
      onFilter(contentfilter.data);
    } catch (error) {
      console.error("Error fetching content list:", error);
    }
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
                  id="contents_name"
                  name="contents_name"
                  placeholder="Enter contents name"
                  value={contents_data?.contents_name?.toLocaleLowerCase()}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="row">
                <div className="d-grid gap-2 d-md-flex justify-content-md-right">
                  <button
                    className="btn btn-primary me-md-2 btn-sm"
                    type="button"
                    onClick={handleSubmitContentsFilterFunc}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-primary me-md-2 btn-sm"
                    type="button"
                    onClick={handleSubmitContentsFilterResetFunc}
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

export default ContentsFilter;
