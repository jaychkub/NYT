import "./App.scss";

import { useState } from "react";

import { IoClose } from "react-icons/io5";

import Header from "./components/Header/Header";
import Wordle from "./pages/Wordle/Wordle";

function App() {
	const [isRulesDisplayed, setIsRulesDisplayed] = useState(false);
	const [isLeaderboardDisplayed, setIsLeaderboardDisplayed] = useState(false);
	const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false);

	return (
		<div className="app">
			<Header
				setIsRulesDisplayed={setIsRulesDisplayed}
				setIsLeaderboardDisplayed={setIsLeaderboardDisplayed}
				setIsSettingsDisplayed={setIsSettingsDisplayed}
			/>

			<Wordle setIsRulesDisplayed={setIsRulesDisplayed} />

			<div className={`modal ${isRulesDisplayed ? "rules" : "hide"}`}>
				<button
					onClick={() => setIsRulesDisplayed(false)}
					className="close-btn">
					HIDDEN CLOSE
				</button>
				<h1>Rules</h1>
				<button onClick={() => setIsRulesDisplayed(false)}>
					<IoClose />
				</button>
			</div>
			<div
				className={`modal ${
					isLeaderboardDisplayed ? "leaderboard" : "hide"
				}`}>
				<h1>Leaderboard</h1>
				<button onClick={() => setIsLeaderboardDisplayed(false)}>
					<IoClose />
				</button>
			</div>
			<div
				className={`modal ${
					isSettingsDisplayed ? "settings" : "hide"
				}`}>
				<button
					onClick={() => setIsSettingsDisplayed(false)}
					className="close-btn">
					HIDDEN CLOSE
				</button>
				<div className="settings-header">
					<h1>Settings</h1>
					<button onClick={() => setIsSettingsDisplayed(false)}>
						<IoClose />
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
