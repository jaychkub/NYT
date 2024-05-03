import "./Wordle.scss";

import React, { useEffect, useState } from "react";

import WordleGrid from "../../components/WordleGrid.jsx/WordleGrid";
import Keyboard from "../../components/Keyboard/Keyboard";

const Wordle = (props) => {
	const [isStarted, setIsStarted] = useState(true);
	const [isStatsDisplayed, setIsStatsDisplayed] = useState(false);
	const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
	const [theWord, setTheWord] = useState("pause");

	useEffect(() => {
		console.log("currentGuessIndex: ", currentGuessIndex);
	}, [currentGuessIndex]);

	return (
		<>
			{isStarted ? (
				<div className="page wordle">
					{/* <h1>WORDLE</h1>
					<button onClick={() => setIsStatsDisplayed(true)}>
						STATS
					</button> */}
					<WordleGrid
						currentGuessIndex={currentGuessIndex}
						setCurrentGuessIndex={setCurrentGuessIndex}
						theWord={theWord}
						setIsStatsDisplayed={setIsStatsDisplayed}
					/>
					<Keyboard />
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
					{/* LOGO */}
					<h1>Wordle</h1>
					<p className="description">
						Get 6 chances to guess a 5-letter word.
					</p>
					<button onClick={() => setIsStarted(true)}>PLAY</button>
					<button onClick={() => props.setIsLoginDisplayed(true)}>
						Log in
					</button>
					<button onClick={() => props.setIsRulesDisplayed(true)}>
						How to play
					</button>
					<p className="date">April 29, 2024</p>
					<p>No. 1</p>
					<p>Recreated by Jake Courtney</p>
				</div>
			)}
		</>
	);
};

export default Wordle;
