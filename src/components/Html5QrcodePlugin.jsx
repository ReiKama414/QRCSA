import {Html5QrcodeScanner} from "html5-qrcode";
import {useEffect} from "react";

const qrcodeRegionId = "html5-qr-code";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
	let config = {};
	// 幀率
	if (props.fps) {
		config.fps = props.fps;
	}
	// QR 碼框大小
	if (props.qrbox) {
		config.qrbox = props.qrbox;
	}
	// 畫面比例
	if (props.aspectRatio) {
		config.aspectRatio = props.aspectRatio;
	}
	// 是否禁用翻轉鏡頭
	if (props.disableFlip !== undefined) {
		config.disableFlip = props.disableFlip;
	}
	return config;
};

const Html5QrcodePlugin = (props) => {
	useEffect(() => {
		// when component mounts
		const config = createConfig(props);
		const verbose = props.verbose === true;
		// Suceess callback is required.
		if (!props.qrCodeSuccessCallback) {
			// eslint-disable-next-line no-throw-literal
			throw "qrCodeSuccessCallback is required callback.";
		}
		const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
		html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

		// cleanup function when component will unmount
		return () => {
			html5QrcodeScanner.clear().catch((error) => {
				console.error("Failed to clear html5QrcodeScanner. ", error);
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
