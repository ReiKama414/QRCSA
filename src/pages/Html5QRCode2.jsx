import React, {useState, useEffect} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";

const Html5QRCode2 = () => {
	const [scannedData, setScannedData] = useState([]);
	const [latestScan, setLatestScan] = useState("");

	useEffect(() => {
		const qrCodeScanner = new Html5QrcodeScanner("html5-qr-code", {
			fps: 2,
			qrbox: 250,
		});

		qrCodeScanner.render((decodedText, decodedResult) => {
			if (decodedText !== latestScan) {
				setLatestScan(decodedText);
				console.log(decodedText, decodedResult);
				setScannedData((prevData) => [decodedText, ...prevData]);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h1 className="tw-text-3xl tw-font-bold tw-underline">Html5 QRCode</h1>
			<div id="html5-qr-code"></div>
			<div>
				<h2>Results:</h2>
				<p>{latestScan}</p>
			</div>
			<div>
				<h2>History:</h2>
				<ul>
					{scannedData.map((data, index) => (
						<li key={index}>{data}</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Html5QRCode2;
