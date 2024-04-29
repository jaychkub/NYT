import "./Header.scss";

import React, { useState } from "react";

const Header = () => {
	const [isHamburgerDisplayed, setIsHamburgerDisplayed] = useState(false);
	const [isRulesDisplayed, setIsRulesDisplayed] = useState(false);
	const [isLeaderboardDisplayed, setIsLeaderboardDisplayed] = useState(false);
	const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false);

	return (
		<div className="header">
			<button onClick={() => setIsHamburgerDisplayed(true)}>
				HAMBURG
			</button>
			<h1>HEADER</h1>
			<button onClick={() => setIsRulesDisplayed(true)}>RULES</button>
			<button onClick={() => setIsLeaderboardDisplayed(true)}>
				LEADERBOARD
			</button>
			<button onClick={() => setIsSettingsDisplayed(true)}>
				SETTINGS
			</button>
			<div className={`modal ${isRulesDisplayed ? "rules" : "hide"}`}>
				<h1>Rules</h1>
				<button onClick={() => setIsRulesDisplayed(false)}>
					CLOSE
				</button>
			</div>
			<div
				className={`modal ${
					isLeaderboardDisplayed ? "leaderboard" : "hide"
				}`}>
				<h1>Leaderboard</h1>
				<button onClick={() => setIsLeaderboardDisplayed(false)}>
					CLOSE
				</button>
			</div>
			<div
				className={`modal ${
					isSettingsDisplayed ? "settings" : "hide"
				}`}>
				<h1>Settings</h1>
				<button onClick={() => setIsSettingsDisplayed(false)}>
					CLOSE
				</button>
			</div>
			<div className={`${isHamburgerDisplayed ? "menu" : "hide"}`}>
				<h1>Hamburger</h1>
				<button onClick={() => setIsHamburgerDisplayed(false)}>
					CLOSE
				</button>
			</div>
		</div>
	);
};

export default Header;
