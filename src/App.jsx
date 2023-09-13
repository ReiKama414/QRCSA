import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
	return (
		<>
			<Navbar />

			<div id="detail" className="tw-container tw-mx-auto tw-px-4">
				<Outlet />
			</div>
		</>
	);
};

export default App;
