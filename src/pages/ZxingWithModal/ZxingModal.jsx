import React, {useState} from "react";
import {Modal, Toast, ToastContainer} from "react-bootstrap";
import QrCodeScanner from "../../components/QrCodeScanner";

const ZxingModal = ({show, setShow, setOutput}) => {
	const [result, setResult] = useState("");

	const handleClose = () => {
		setResult("");
		setShow(false);
	};
	const handleClick = () => {
		setOutput(result);
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
			<Modal.Header closeButton>
				<Modal.Title>Modal Test</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="position-relative">
					{/* QrCodeScanner */}
					<QrCodeScanner setResult={setResult} />

					{/* Result */}
					{result && (
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
					)}
				</div>
				{/* Hints */}
				<h3 className="tw-text-center tw-pb-8 fs-5">請正對螢幕，對準方框內</h3>
			</Modal.Body>
		</Modal>
	);
};

export default ZxingModal;
