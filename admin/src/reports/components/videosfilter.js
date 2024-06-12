import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	retrieveVideos,
} from "../actions/videos";



const VideosFilter = () => {
	const dispatch = useDispatch();
	// console.log(show);
	const initialVideosData = {
		videos_name: "",
	};
	const [videos_data, set_videos_data] = React.useState(initialVideosData);
	const [showModal, setShowModal] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		set_videos_data({ ...videos_data, [name]: value });
	}

	const handleSubmitVideosFilterFunc = () => {
		dispatch(retrieveVideos(videos_data));
	}

	const handleSubmitVideosFilterResetFunc = () => {
		dispatch(retrieveVideos({}));
	}
	return (
		<div className="container-fluid mt-2">
			<div className="row">
				<div className="card card-primary">
					<form className="card-body">
						<div className="row">
							<div className="mb-2">
								<input type="text" className="form-control form-control-sm" id="videos_name" name="videos_name" placeholder="Enter videos name" value={videos_data.videos_name} onChange={handleChange}></input>
							</div>
							<div className="row">
								<div className="d-grid gap-2 d-md-flex justify-content-md-right">
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitVideosFilterFunc}>Submit</button>
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitVideosFilterResetFunc}>Reset</button>
								</div>	
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default VideosFilter;

