import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Button, Modal, Toast, ToastContainer} from "react-bootstrap";
import Swal from "sweetalert2";
import QrCodeScanner from "../../components/QrCodeScanner";

const ZxingNestedModal2 = () => {
	const [showModal, setShowModal] = useState(false);


	const handleCloseModal = () => {
		setShowModal(false);
	};

	const modalContent = (
		<Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false} centered>
			<Modal.Header closeButton>
				<Modal.Title>React Bootstrap Modal</Modal.Title>
			</Modal.Header>
			<Modal.Body>This is a React Bootstrap Modal.</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseModal}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);

	const openSweetAlert = () => {
		const el = document.createElement("div");
		ReactDOM.render(modalContent, el);
		setShowModal(true);

		Swal.fire({
			html: el,
			showCancelButton: true,
			showConfirmButton: false,
			cancelButtonText: "Close",
		}).then((result) => {
			if (result.isDismissed) {
				ReactDOM.unmountComponentAtNode(el);
			}
		});
	};

	return (
		<div>
			<Button variant="success" onClick={openSweetAlert}>
				Open SweetAlert2 with Modal
			</Button>
		</div>
	);
};

export default ZxingNestedModal2;
