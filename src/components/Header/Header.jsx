import "./Header.scss";

import React, { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Header = (props) => {
	const [isHamburgerDisplayed, setIsHamburgerDisplayed] = useState(false);

	return (
		<div className="header">
			<button onClick={() => setIsHamburgerDisplayed(true)}>
				<GiHamburgerMenu />
			</button>
			<h1>HEADER</h1>
			<button onClick={() => props.setIsRulesDisplayed(true)}>
				<FaRegQuestionCircle />
			</button>
			<button onClick={() => props.setIsLeaderboardDisplayed(true)}>
				<MdOutlineLeaderboard />
			</button>
			<button onClick={() => props.setIsSettingsDisplayed(true)}>
				<FaGear />
			</button>
			<a href="https://jaychkub.github.io/portfolio-v3/">
				CHECK MY PORTFOLIO
			</a>

			<div className={`${isHamburgerDisplayed ? "menu" : "hide"}`}>
				<button
					className="close-btn"
					onClick={() => setIsHamburgerDisplayed(false)}>
					HIDDEN CLOSE
				</button>
				<h1>Hamburger</h1>
				<button onClick={() => setIsHamburgerDisplayed(false)}>
					<IoClose />
				</button>
			</div>
		</div>
	);
};

export default Header;
