import React, {useState} from "react";
import {Button} from "react-bootstrap";
import ZxingModal from "./ZxingModal";

const ZxingWithModal = () => {
	const [output, setOutput] = useState("");
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);

	return (
		<div className="text-center">
			<Button className="mt-5" variant="primary" onClick={handleShow}>
				Launch demo modal
			</Button>

			<ZxingModal show={show} setShow={setShow} setOutput={setOutput} />

			<p className="mt-3">Final Output: {output}</p>
		</div>
	);
};

export default ZxingWithModal;
