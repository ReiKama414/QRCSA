import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App";
import QRCodeScanner from "./pages/QRCodeScanner";
import Other from "./pages/Other";
import ErrorPage from "./pages/ErrorPage";
import reportWebVitals from "./test/reportWebVitals";
import "./assets/styles/tailwindcss.sass";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				// path: "/qrcodescanner",
				element: <QRCodeScanner />,
			},
			{
				path: "/other",
				element: <Other />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals();
