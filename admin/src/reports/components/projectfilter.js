import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	retrieveProject,
} from "../actions/project";



const ProjectFilter = () => {
	const dispatch = useDispatch();

	const initialProjectData = {
		project_name: "",
	};
	const [project_data, set_project_data] = React.useState(initialProjectData);


	const handleChange = (event) => {
		const { name, value } = event.target;
		set_project_data({ ...project_data, [name]: value });
	}

	const handleSubmitProjectFilterFunc = () => {
		dispatch(retrieveProject(project_data));
	}

	const handleSubmitProjectFilterResetFunc = () => {
		dispatch(retrieveProject({}));
	}
	return (
		<div className="container-fluid mt-2">
			<div className="row">
				<div className="card card-primary">
					<form className="card-body">
						<div className="row">
							<div className="mb-2">
								<input type="text" className="form-control form-control-sm" id="project_name" name="project_name" placeholder="Enter project name" value={project_data.project_name} onChange={handleChange}></input>
							</div>
							<div className="row">
								<div className="d-grid gap-2 d-md-flex justify-content-md-right">
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitProjectFilterFunc}>Submit</button>
									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitProjectFilterResetFunc}>Reset</button>
								</div>	
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ProjectFilter;

