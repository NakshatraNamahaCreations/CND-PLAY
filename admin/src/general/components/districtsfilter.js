import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	retrieveDistricts,
} from "../actions/districts";



const DistrictsFilter = () => {
	const dispatch = useDispatch();
	const initialDistrictsData = {
		districts_name: "",
	};
	const [districts_data, set_districts_data] = React.useState(initialDistrictsData);
	const [showModal, setShowModal] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		set_districts_data({ ...districts_data, [name]: value });
	}

	const handleSubmitDistrictsFilterFunc = () => {
		dispatch(retrieveDistricts(districts_data));
	}

	const handleSubmitDistrictsFilterResetFunc = () => {
		dispatch(retrieveDistricts({}));
	}
	return (
		<div className="container-fluid mt-2">
			<div className="row">
				<div className="card card-primary">
					<form className="card-body">
						<div className="row">
							<div className="mb-2">
								<input type="text" className="form-control form-control-sm" id="districts_name" name="districts_name" placeholder="Enter Districts name" value={districts_data.districts_name} onChange={handleChange}></input>
							</div>
							<div className="row">
								<div className="d-grid gap-2 d-md-flex justify-content-md-right">
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitDistrictsFilterFunc}>Submit</button>
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitDistrictsFilterResetFunc}>Reset</button>
								</div>	
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default DistrictsFilter;

