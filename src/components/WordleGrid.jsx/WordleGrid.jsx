import "./WordleGrid.scss";

import React, { useEffect, useRef, useState } from "react";

import validWords from "../../assets/valid";

const WordleGrid = ({
	currentGuessIndex,
	setCurrentGuessIndex,
	theWord,
	setIsStatsDisplayed,
}) => {
	let guesses = [];

	const handleGameEnd = (isWon) => {
		console.log(`The game has ended! isWon? ${isWon}`);
		setIsStatsDisplayed(true);
	};

	for (let i = 0; i < 6; i++) {
		guesses.push(
			<Guess
				key={i}
				id={i}
				currentGuessIndex={currentGuessIndex}
				setCurrentGuessIndex={setCurrentGuessIndex}
				theWord={theWord}
				handleGameEnd={handleGameEnd}
			/>
		);
	}

	return <div className="wordle-grid">{guesses}</div>;
};

const Guess = ({
	id,
	currentGuessIndex,
	setCurrentGuessIndex,
	theWord,
	handleGameEnd,
}) => {
	const [guess, setGuess] = useState(["", "", "", "", ""]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isColored, setIsColored] = useState(false);

	const setGuessAtIndex = (index, value) => {
		const i = index - id * 5;
		// console.log(`CONVERT: ${i}`);
		let copy = [...guess];
		copy[i] = value;
		setGuess(copy);
	};

	useEffect(() => {
		console.log("guess-index: ", id, ", guess: ", guess);
	}, [guess]);

	useEffect(() => {
		if (currentGuessIndex >= 6) return handleGameEnd(false);
		document.getElementById(`slot-${currentGuessIndex * 5}`).focus();
	}, [currentGuessIndex]);

	useEffect(() => {
		if (isColored) {
			// debugger;
			let greenCount = 0;
			const slots = document.getElementById(`guess-${id}`).children;
			Array.from(slots).forEach((slot) => {
				if (slot.className.split(" ")[1] === "green") greenCount++;
			});
			if (greenCount === 5) handleGameEnd(true);
		}
	}, [isColored]);

	const handleKeyUp = (event, ID) => {
		// console.log("keyCode: ", event.keyCode);

		// console.log("event.target.value: ", event.target.value);

		switch (event.keyCode) {
			case 8: // BACKSPACE KEY
				console.log("PRESSED: BACKSPACE");
				let offset = 1;
				if (event.target.value) offset = 0;

				document.getElementById(
					`slot-${Math.max(ID - offset, currentGuessIndex * 5)}`
				).value = "";
				document
					.getElementById(
						`slot-${Math.max(ID - offset, currentGuessIndex * 5)}`
					)
					.focus();
				setGuessAtIndex(
					Math.max(ID - offset, currentGuessIndex * 5),
					""
				);

				// console.log("offset: ", offset);
				break;
			case 9: // TAB KEY
				break;
			case 13: // ENTER KEY
				console.log("PRESSED: ENTER");

				const isValid = () => {
					for (let i = 0; i < validWords.length; i++) {
						if (validWords[i] == guess.join("")) return true;
					}
					// alert("Not a valid word!!!");
					console.log("Not a valid word!!!");
					return false;
				};

				if (
					!(
						ID === currentGuessIndex * 5 + 4 &&
						event.target.value &&
						isValid()
					)
				)
					break;

				console.log("SUCCESS: ENTER");
				setIsSubmitted(true);

				setCurrentGuessIndex((prev) => prev + 1);

				break;
			case 16: // SHIFT KEY
				break;
			case 20: // CAPS LOCK
				break;
			case 32: // SPACE KEY
				// console.log("PRESSED: SPACE");
				// let val = document.getElementById(`slot-${ID}`).value;
				// if (val === " ") {
				// document.getElementById(`slot-${ID}`).value = "";
				// }
				break;
			default:
				console.log("PRESSED: LETTER");
				if (event.target.value) {
					document
						.getElementById(
							`slot-${Math.min(
								ID + 1,
								currentGuessIndex * 5 + 4
							)}`
						)
						.focus();
				}

				break;
		}
	};

	let slots = [];
	for (let i = 0; i < 5; i++) {
		slots.push(
			<Slot
				key={i}
				index={id * 5 + i}
				guessIndex={i}
				handleKeyUp={handleKeyUp}
				guessAtIndex={guess[i]}
				setGuessAtIndex={setGuessAtIndex}
				isSubmitted={isSubmitted}
				theWord={theWord}
				setIsColored={setIsColored}
			/>
		);
	}

	return (
		<div className="guess" id={`guess-${id}`}>
			{slots}
		</div>
	);
};

const Slot = ({
	index,
	guessIndex,
	handleKeyUp,
	guessAtIndex,
	setGuessAtIndex,
	isSubmitted,
	theWord,
	setIsColored,
}) => {
	const inputRef = useRef(null);

	const [value, setValue] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [color, setColor] = useState("");

	const handleChange = (event) => {
		console.log("onChange");
		const newValue = event.target.value;
		const regex = /^[a-zA-Z\s\r\n]*$/;

		if (newValue === "" || regex.test(newValue)) {
			setValue(newValue);
			setIsValid(true);
		}
	};

	useEffect(() => {
		setGuessAtIndex(index, value);
		// console.log(`CALLED: setGuessAtIndex(${index}, ${value})`);
		// console.log(`CHANGED: value, ${value}`);
	}, [value]);

	useEffect(() => {
		setValue(guessAtIndex);
	}, [guessAtIndex]);

	useEffect(() => {
		if (!isSubmitted) return;

		if (value) setColor("gray");
		if (theWord.split("").includes(value)) setColor("yellow");
		if (theWord.split("")[guessIndex] === value) setColor("green");

		if (guessIndex === 4) setIsColored(true);
	}, [isSubmitted]);

	return (
		<input
			ref={inputRef}
			type="text"
			value={value}
			maxLength={"1"}
			className={`slot ${color}`}
			id={`slot-${index}`}
			pattern={"[ a-zA-Z]{1}"}
			onKeyUp={(e) => {
				if (isValid) handleKeyUp(event, index);
			}}
			onKeyDown={(e) => {
				if (e.keyCode === 8) e.preventDefault();
				if (e.keyCode === 9) e.preventDefault();
				if (e.keyCode === 32) e.preventDefault();
			}}
			onChange={handleChange}
		/>
	);
};

export default WordleGrid;
