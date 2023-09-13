import React, {useState} from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	const navLinks = [
		// {text: "Home", url: "/"},
		// {text: "Html5-QRCode 1", url: "/html5qrcode1"},
		// {text: "Html5-QRCode 2", url: "/html5qrcode2"},
		// {text: "Zxing", url: "/zxing"},
		{text: "ZxingWithModal",url: "/"}, // /zxingwithmodal
		// {text: "ZxingNestedModal",url: "/zxingnestedmodal"},
		// {text: "ZxingNestedModal2",url: "/zxingnestedmodal2"},
		// {text: "Other", url: "/other"},
	];

	return (
		<nav className="tw-bg-blue-500 tw-p-4">
			<div className="tw-flex tw-justify-between tw-items-center">
				<div className="tw-text-white tw-font-bold tw-text-xl">Demo Scanner</div>
				<div className="md:tw-hidden">
					<button onClick={toggleNav} className="tw-text-white">
						<svg
							className="tw-w-6 tw-h-6"
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
				<div className="tw-hidden md:tw-flex tw-space-x-4">
					{navLinks.map((link, index) => (
						<Link key={index} to={link.url} className="tw-text-white hover:tw-text-gray-300">
							{link.text}
						</Link>
					))}
				</div>
			</div>
			{isNavOpen && (
				<div className="md:tw-hidden tw-mt-2">
					{navLinks.map((link, index) => (
						<Link key={index} to={link.url} className="tw-block tw-text-white tw-py-2">
							{link.text}
						</Link>
					))}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
