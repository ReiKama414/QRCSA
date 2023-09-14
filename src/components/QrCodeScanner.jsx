import React, {useState, useEffect, useRef} from "react";
import {useZxing} from "react-zxing";
import cx from "classnames";
import style from "./qrcodescanner.module.scss";

const QrCodeScanner = ({classNames = "", setResult}) => {
	const [error, setError] = useState("");
	const [flash, setFlash] = useState(false);
	const canvas1Ref = useRef(null);
	const canvas2Ref = useRef(null);
	const DELAY_TIME = 450;

	const {ref} = useZxing({
		onDecodeResult(result) {
			setResult(result.getText());
			setFlash(true);
			setTimeout(() => {
				setFlash(false);
			}, DELAY_TIME);
		},
		onDecodeError(error) {
			console.log(error);
		},
		onError(error) {
			setError(error.toString());
		},
		timeBetweenDecodingAttempts: DELAY_TIME,
		constraints: {video: {facingMode: "environment", width: {ideal: 1024}, height: {ideal: 768}}, audio: false},
	});

	useEffect(() => {
		const [canvas1, canvas2] = [canvas1Ref.current, canvas2Ref.current];
		const [context1, context2] = [canvas1.getContext("2d"), canvas2.getContext("2d")];

		const drawFrame = () => {
			if (ref.current) {
				const videoWidth = ref.current.videoWidth;
				const videoHeight = ref.current.videoHeight;

				// 計算裁剪區域的大小和位置（將影片裁剪為1:1比例）
				const size = Math.min(videoWidth, videoHeight);
				const xOffset = (videoWidth - size) / 2;
				const yOffset = (videoHeight - size) / 2;

				// 在 Canvas 上繪製裁剪後的影片幀
				context1.drawImage(ref.current, xOffset, yOffset, size, size, 0, 0, canvas1.width, canvas1.height);
				context2.drawImage(ref.current, 0, 0, videoWidth, videoHeight, 0, 0, canvas2.width, canvas2.height);

				// 畫一個填滿整個 Canvas 的黑色矩形
				context2.fillStyle = "rgba(0, 0, 0, 0.5)";
				context2.fillRect(0, 0, canvas2.width, canvas2.height);

				// 遞歸調用以繪製下一幀
				requestAnimationFrame(drawFrame);
			}
		};

		drawFrame();
	}, []);

	return (
		<div className={cx("position-relative mx-auto my-4 w-100", classNames)} style={{maxWidth: "24rem"}}>
			{/* Error Message */}
			{error && (
				<span
					className="position-absolute end-0 d-inline-flex align-items-center py-2 text-danger fw-medium w-100"
					style={{
						paddingLeft: "0.75rem",
						paddingRight: "0.75rem",
						fontSize: "0.75rem",
						backgroundColor: "rgb(254,242,242)",
						zIndex: 10,
					}}>
					{error}
				</span>
			)}
			{/* Scanner Area */}
			<div className="position-relative bg-black w-100 overflow-hidden" style={{aspectRatio: "3/4"}}>
				{/* <div className="position-absolute w-100 h-100" style={{backdropFilter: "brightness(.375)", zIndex: 2}}></div> */}
				<video ref={ref} className={cx({invisible: !error})} />
			</div>
			{/* Scanning frame */}
			<div className={"position-absolute d-flex align-items-center top-0 w-100 h-100"}>
				{error && (
					<div
						className={cx("w-100 ratio ratio-1x1", style.scannerBorder)}
						style={{
							"--sbColor": flash ? "#64ff6a" : "white",
							"--sbSize": "40px",
							"--sbWidth": "4px",
							marginLeft: "2rem",
							marginRight: "2rem",
							// borderImageSource: `radial-gradient(60% 60%, transparent 0px, transparent 100%, ${
							// 	flash ? "#64ff6a" : "white"
							// } 100%)`,
							// borderImageSlice: 1,
							// borderWidth: "4px",
							// borderStyle: "solid",
							// borderImageOutset: 0,
							zIndex: 5,
						}}></div>
				)}
				<canvas
					ref={canvas2Ref}
					width={1024}
					height={768}
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: "100%",
						aspectRatio: "3/4",
						transform: "translate(-50%, -50%)",
						zIndex: 1,
					}}
				/>
				<canvas
					ref={canvas1Ref}
					width={1024}
					height={768}
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: "100%",
						aspectRatio: "1/1",
						transform: "translate(-50%, -50%)",
						zIndex: 3,
					}}
				/>
			</div>
		</div>
	);
};

export default QrCodeScanner;
