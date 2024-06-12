import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	retrieveSeries,
} from "../actions/series";



const SeriesFilter = () => {
	const dispatch = useDispatch();
	// console.log(show);
	const initialSeriesData = {
		series_name: "",
	};
	const [series_data, set_series_data] = React.useState(initialSeriesData);
	

	const handleChange = (event) => {
		const { name, value } = event.target;
		set_series_data({ ...series_data, [name]: value });
	}

	const handleSubmitSeriesFilterFunc = () => {
		dispatch(retrieveSeries(series_data));
	}

	const handleSubmitSeriesFilterResetFunc = () => {
		dispatch(retrieveSeries({}));
	}
	return (
		<div className="container-fluid mt-2">
			<div className="row">
				<div className="card card-primary">
					<form className="card-body">
						<div className="row">
							<div className="mb-2">
								<input type="text" className="form-control form-control-sm" id="series_name" name="series_name" placeholder="Enter series name" value={series_data.series_name} onChange={handleChange}></input>
							</div>
							<div className="row">
								<div className="d-grid gap-2 d-md-flex justify-content-md-right">
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitSeriesFilterFunc}>Submit</button>
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitSeriesFilterResetFunc}>Reset</button>
								</div>	
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SeriesFilter;

