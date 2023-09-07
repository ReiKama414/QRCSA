import React, {useState} from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	const navLinks = [
		{text: "QRCode Scanner", url: "/"}, // /qrcodescanner
		{text: "Other", url: "/other"},
	];

	return (
		<nav className="bg-blue-500 p-4">
			<div className="flex justify-between items-center">
				<div className="text-white font-bold text-xl">My Website</div>
				<div className="md:hidden">
					<button onClick={toggleNav} className="text-white">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							{isNavOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
							)}
						</svg>
					</button>
				</div>
				<div className="hidden md:flex space-x-4">
					{navLinks.map((link, index) => (
						<Link key={index} to={link.url} className="text-white hover:text-gray-300">
							{link.text}
						</Link>
					))}
				</div>
			</div>
			{isNavOpen && (
				<div className="md:hidden mt-2">
					{navLinks.map((link, index) => (
						<Link key={index} to={link.url} className="block text-white py-2">
							{link.text}
						</Link>
					))}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
