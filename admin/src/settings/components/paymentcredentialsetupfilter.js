// import React, { useState, useEffect } from "react";


// const PaymentCredentialSetupFilter = () => {
// 	const dispatch = useDispatch();
// 	// console.log(show);
// 	const initialPaymentCredentialSetupData = {
// 		paymentcredentialsetup_name: "",
// 	};
// 	const [paymentcredentialsetup_data, set_paymentcredentialsetup_data] = React.useState(initialPaymentCredentialSetupData);
// 	const [showModal, setShowModal] = useState(false);
// 	const [submitted, setSubmitted] = useState(false);

// 	const handleChange = (event) => {
// 		const { name, value } = event.target;
// 		set_paymentcredentialsetup_data({ ...paymentcredentialsetup_data, [name]: value });
// 	}

// 	const handleSubmitPaymentCredentialSetupFilterFunc = () => {
// 		dispatch(retrievePaymentCredentialSetup(paymentcredentialsetup_data));
// 	}

// 	const handleSubmitPaymentCredentialSetupFilterResetFunc = () => {
// 		dispatch(retrievePaymentCredentialSetup({}));
// 	}
// 	return (
// 		<div className="container-fluid mt-2">
// 			<div className="row">
// 				<div className="card card-primary">
// 					<form className="card-body">
// 						<div className="row">
// 							<div className="mb-2">
// 								<input type="text" className="form-control form-control-sm" id="paymentcredentialsetup_name" name="paymentcredentialsetup_name" placeholder="Enter paymentcredentialsetup name" value={paymentcredentialsetup_data.paymentcredentialsetup_name} onChange={handleChange}></input>
// 							</div>
// 							<div className="row">
// 								<div className="d-grid gap-2 d-md-flex justify-content-md-right">
// 									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitPaymentCredentialSetupFilterFunc}>Submit</button>
// 									<button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={handleSubmitPaymentCredentialSetupFilterResetFunc}>Reset</button>
// 								</div>	
// 							</div>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default PaymentCredentialSetupFilter;

