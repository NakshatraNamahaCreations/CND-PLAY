import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	retrieveEpisodes,
} from "../actions/episodes";



const EpisodesFilter = () => {
	const dispatch = useDispatch();

	const initialEpisodesData = {
		episodes_name: "",
	};
	const [episodes_data, set_episodes_data] = React.useState(initialEpisodesData);
	

	const handleChange = (event) => {
		const { name, value } = event.target;
		set_episodes_data({ ...episodes_data, [name]: value });
	}

	const handleSubmitEpisodesFilterFunc = () => {
		dispatch(retrieveEpisodes(episodes_data));
	}

	const handleSubmitEpisodesFilterResetFunc = () => {
		dispatch(retrieveEpisodes({}));
	}
	return (
		<div className="container-fluid mt-2">
			<div className="row">
				<div className="card card-primary">
					<form className="card-body">
						<div className="row">
							<div className="mb-2">
								<input type="text" className="form-control form-control-sm" id="episodes_name" name="episodes_name" placeholder="Enter episodes name" value={episodes_data.episodes_name} onChange={handleChange}></input>
							</div>
							<div className="row">
								<div className="d-grid gap-2 d-md-flex justify-content-md-right">
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitEpisodesFilterFunc}>Submit</button>
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitEpisodesFilterResetFunc}>Reset</button>
								</div>	
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default EpisodesFilter;

