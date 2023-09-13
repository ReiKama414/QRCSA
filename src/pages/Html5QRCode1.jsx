import React from "react";
import Html5QrcodePlugin from "../components/Html5QrcodePlugin";

const Html5QRCode = () => {
	const onNewScanResult = (decodedText, decodedResult) => {
		alert(decodedText);
		console.log(decodedResult);
	};

	return (
		<div>
			<h1 className="tw-text-3xl tw-font-bold tw-underline">Html5 QRCode</h1>
			<Html5QrcodePlugin fps={10} qrbox={250} disableFlip={false} qrCodeSuccessCallback={onNewScanResult} />
		</div>
	);
};

export default Html5QRCode;
