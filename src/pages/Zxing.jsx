import React, {useState, useEffect, useRef} from "react";
import {useZxing} from "react-zxing";
import cx from "classnames";
import style from "./zxing.module.scss";

const Zxing = () => {
	const [result, setResult] = useState("");
	const [error, setError] = useState("");
	// const [paused, setPaused] = useState(false);
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
		// paused,
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
		<div className="tw-text-center">
			<div className="tw-relative tw-mx-auto tw-my-5 tw-max-w-sm">
				{/* Error Message */}
				{error && (
					<span
						className="tw-absolute tw-left-0 tw-inline-flex tw-items-center tw-bg-red-50 tw-px-3 tw-py-2 tw-text-xs tw-font-medium tw-text-red-700 tw-ring-1 tw-ring-inset tw-ring-red-600/10 tw-w-full"
						style={{zIndex: 4}}>
						{error}
					</span>
				)}
				{/* Scanner Area */}
				<div className="tw-relative tw-bg-black" style={{width: "100%", aspectRatio: "3/4"}}>
					<div className="tw-absolute tw-backdrop-brightness-375 tw-w-full tw-h-full" style={{zIndex: 1}}></div>
					<video ref={ref} />
				</div>
				{/* Scanning frame */}
				<div className={cx("tw-absolute tw-flex tw-items-center tw-top-0 tw-w-full tw-h-full", style.scanningFrame)}>
					<div
						className="tw-mx-8 tw-w-full tw-aspect-square"
						style={{
							borderImageSource: `radial-gradient(60% 60%, transparent 0px, transparent 100%, ${flash ? '#64ff6a' : 'white'} 100%)`,
							borderImageSlice: 1,
							borderWidth: "4px",
							borderStyle: "solid",
							borderImageOutset: 0,
							zIndex: 3,
						}}></div>
					<canvas
						ref={canvasRef}
						width={1024}
						height={768}
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
                            width: "100%",
							// width: "calc(100% - 4rem - 8px)",
							aspectRatio: "1/1",
							transform: "translate(-50%, -50%)",
							// objectFit: "cover",
							// objectPosition: "center",
							zIndex: 2,
						}}
					/>
				</div>
			</div>
			{/* Hints */}
			<h3 className="tw-pb-8">請正對螢幕，對準方框內</h3>
			{/* Result */}
			<p className="tw-pb-4">
				<span>Last result:</span>
				<span>{result}</span>
			</p>
			{/* Function */}
			{/* <button
				className="tw-px-4 tw-py-2 tw-font-semibold tw-text-sm tw-bg-cyan-500 tw-text-white tw-rounded-full tw-shadow-sm tw-w-28 disabled:tw-grayscale"
				onClick={() => setPaused(!paused)}
				disabled={error}>
				{paused || error ? "Resume" : "Pause"}
			</button> */}
		</div>
	);
};

export default Zxing;
