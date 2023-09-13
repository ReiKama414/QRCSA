import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Html5QRCode1 from "./pages/Html5QRCode1";
import Html5QRCode2 from "./pages/Html5QRCode2";
import Zxing from "./pages/Zxing";
import ZxingWithModal from "./pages/ZxingWithModal/ZxingWithModal";
import ZxingNestedModal from "./pages/ZxingWithModal/ZxingNestedModal";
import ZxingNestedModal2 from "./pages/ZxingWithModal/ZxingNestedModal2";
import Other from "./pages/Other";
import ErrorPage from "./pages/ErrorPage";
import reportWebVitals from "./test/reportWebVitals";
import "./assets/styles/tailwindcss.sass";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <App />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					// element: <Home />,
					element: <ZxingWithModal />,
				},
				{
					path: "/html5qrcode1",
					element: <Html5QRCode1 />,
				},
				{
					path: "/html5qrcode2",
					element: <Html5QRCode2 />,
				},
				{
					path: "/zxing",
					element: <Zxing />,
				},
				{
					path: "/zxingwithmodal",
					element: <ZxingWithModal />,
				},
				{
					path: "/zxingnestedmodal",
					element: <ZxingNestedModal />,
				},
				{
					path: "/zxingnestedmodal2",
					element: <ZxingNestedModal2 />,
				},
				{
					path: "/other",
					element: <Other />,
				},
			],
		},
	],
	// https://reactrouter.com/en/main/routers/create-browser-router#basename
	{
		basename: "/QRCSA",
	}
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals();
