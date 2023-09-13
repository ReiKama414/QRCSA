import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Button, Modal, Toast, ToastContainer} from "react-bootstrap";
import Swal from "sweetalert2";
import QrCodeScanner from "../../components/QrCodeScanner";

const ZxingNestedModal = () => {
	const [result, setResult] = useState("");
	// const [output, setOutput] = useState("");
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
	const handleClose = () => {
		setResult("");
		setShow(false);
	};
	// const handleClick = () => {
	// 	setOutput(result);
	// 	setResult("");
	// 	Swal.close();
	// };

	const showAlert = () => {
		const el = document.createElement("div");
		ReactDOM.render(
			<div className="position-relative">
				{/* QrCodeScanner */}
				<QrCodeScanner setResult={setResult} />

				{/* Result */}
				{/* {result && (
					<ToastContainer className="p-3" position={"top-center"} style={{zIndex: 4}}>
						<Toast onClick={handleClick}>
							<Toast.Header closeButton={false}>
								<strong className="me-auto">點擊後確認值</strong>
							</Toast.Header>
							<Toast.Body style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
								{result}
							</Toast.Body>
						</Toast>
					</ToastContainer>
				)} */}
			</div>,
			el
		);

		Swal.fire({
			title: "<strong>HTML <u>example</u></strong>",
			html: el,
			showCloseButton: true,
			showConfirmButton: false,
			focusConfirm: false,
		});
	};

	return (
		<div className="text-center">
			<Button className="mt-5" variant="primary" onClick={handleShow}>
				Launch demo modal
			</Button>

			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<button onClick={showAlert}>Show SweetAlert</button>

					<p className="mt-3">Final Output: {result}</p>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default ZxingNestedModal;
