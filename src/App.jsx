import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
	return (
		<>
			<Navbar />

			<div id="detail" className="container mx-auto">
				<Outlet />
			</div>
		</>
	);
};

export default App;
