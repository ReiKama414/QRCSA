import React, {useState, useEffect, useRef} from "react";
import {useZxing} from "react-zxing";
import cx from "classnames";

const QrCodeScanner = ({classNames = "", setResult}) => {
	const [error, setError] = useState("");
	const [flash, setFlash] = useState(false);
	const canvasRef = useRef(null);
	const DELAY_TIME = 700;

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
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		const drawFrame = () => {
			if (ref.current) {
				const videoWidth = ref.current.videoWidth;
				const videoHeight = ref.current.videoHeight;

				// 計算裁剪區域的大小和位置（將影片裁剪為1:1比例）
				const size = Math.min(videoWidth, videoHeight);
				const xOffset = (videoWidth - size) / 2;
				const yOffset = (videoHeight - size) / 2;

				// 在Canvas上繪製裁剪後的影片幀
				context.drawImage(ref.current, xOffset, yOffset, size, size, 0, 0, canvas.width, canvas.height);

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
						zIndex: 4,
					}}>
					{error}
				</span>
			)}
			{/* Scanner Area */}
			<div className="position-relative bg-black w-100" style={{aspectRatio: "3/4"}}>
				<div className="position-absolute w-100 h-100" style={{backdropFilter: "brightness(.375)", zIndex: 1}}></div>
				<video ref={ref} />
			</div>
			{/* Scanning frame */}
			<div className={"position-absolute d-flex align-items-center top-0 w-100 h-100"}>
				{!error && (
					<div
						className="w-100 ratio ratio-1x1"
						style={{
							marginLeft: "2rem",
							marginRight: "2rem",
							borderImageSource: `radial-gradient(60% 60%, transparent 0px, transparent 100%, white 100%)`,

							// borderImageSource: `radial-gradient(60% 60%, transparent 0px, transparent 100%, ${
							// 	flash ? "#64ff6a" : "white"
							// } 100%)`,
							borderImageSlice: 1,
							borderWidth: "4px",
							borderStyle: "solid",
							borderImageOutset: 0,
							zIndex: 3,
						}}></div>
				)}
				<canvas
					ref={canvasRef}
					width={1024}
					height={768}
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: "100%",
						aspectRatio: "1/1",
						transform: "translate(-50%, -50%)",
						zIndex: 2,
					}}
				/>
			</div>
		</div>
	);
};

export default QrCodeScanner;
