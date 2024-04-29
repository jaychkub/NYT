import "./Wordle.scss";

import React, { useState } from "react";

const Wordle = (props) => {
	const [isStarted, setIsStarted] = useState(false);
	const [isStatsDisplayed, setIsStatsDisplayed] = useState(false);

	return (
		<>
			{isStarted ? (
				<div className="page wordle">
					<h1>WORDLE</h1>
					<button onClick={() => setIsStatsDisplayed(true)}>
						STATS
					</button>
					<div
						className={`modal ${
							isStatsDisplayed ? "stats" : "hide"
						}`}>
						<h1>STATS</h1>
						<button onClick={() => setIsStatsDisplayed(false)}>
							CLOSE
						</button>
					</div>
				</div>
			) : (
				<div className="page wordle-start">
					<h1>PRESS PLAY</h1>
					<button onClick={() => setIsStarted(true)}>PLAY</button>
				</div>
			)}
		</>
	);
};

export default Wordle;
