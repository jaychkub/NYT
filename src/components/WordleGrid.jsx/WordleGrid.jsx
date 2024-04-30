import "./WordleGrid.scss";

import React, { useEffect, useState } from "react";

const WordleGrid = ({ currentGuessIndex, setCurrentGuessIndex }) => {
	let guesses = [];
	for (let i = 0; i < 6; i++) {
		guesses.push(
			<Guess
				key={i}
				id={i}
				currentGuessIndex={currentGuessIndex}
				setCurrentGuessIndex={setCurrentGuessIndex}
			/>
		);
	}

	return <div className="wordle-grid">{guesses}</div>;
};

const Guess = ({ id, currentGuessIndex, setCurrentGuessIndex }) => {
	const [guess, setGuess] = useState(["", "", "", "", ""]);

	const setGuessAtIndex = (index, value) => {
		const i = index - id * 5;
		console.log(`CONVERT: ${i}`);
		let copy = [...guess];
		copy[i] = value;
		setGuess(copy);
	};

	useEffect(() => {
		console.log("guess-index: ", id, ", guess: ", guess);
	}, [guess]);

	useEffect(() => {
		console.log("TEST");
		document.getElementById(`slot-${currentGuessIndex * 5}`).focus();
	}, [currentGuessIndex]);

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
				// console.log("offset: ", offset);
				break;
			case 9: // TAB KEY
				break;
			case 13: // ENTER KEY
				console.log("PRESSED: ENTER");
				if (ID === currentGuessIndex * 5 + 4 && event.target.value) {
					setCurrentGuessIndex((prev) => prev + 1);
					console.log("SUCCESS: ENTER");
				}
				break;
			case 16: // SHIFT KEY
				break;
			case 20: // CAPS LOCK
				break;
			case 32: // SPACE KEY
				console.log("PRESSED: SPACE");
				let val = document.getElementById(`slot-${ID}`).value;
				if (val === " " || val === "")
					document.getElementById(`slot-${ID}`).value = "";
				break;
			default:
				console.log("PRESSED: LETTER");
				document
					.getElementById(
						`slot-${Math.min(ID + 1, currentGuessIndex * 5 + 4)}`
					)
					.focus();
				break;
		}
	};

	let slots = [];
	for (let i = 0; i < 5; i++) {
		slots.push(
			<Slot
				key={i}
				index={id * 5 + i}
				handleKeyUp={handleKeyUp}
				setGuess={setGuessAtIndex}
			/>
		);
	}

	return (
		<div className="guess" id={`guess-${id}`}>
			{slots}
		</div>
	);
};

const Slot = ({ index, handleKeyUp, setGuess }) => {
	const [value, setValue] = useState("");
	const [isValid, setIsValid] = useState(true);

	const handleChange = (event) => {
		const newValue = event.target.value;
		const regex = /^[a-zA-Z\s\r\n]*$/;

		if (newValue === "" || regex.test(newValue)) {
			setValue(newValue);
			setIsValid(true);
		} else {
			setValue("");
			setIsValid(false);
		}
	};

	useEffect(() => {
		setGuess(index, value);
		console.log(`CALLED: setGuessAtIndex(${index}, ${value})`);
	}, [value]);

	return (
		<input
			type="text"
			value={value}
			maxLength={"1"}
			className={`slot`}
			id={`slot-${index}`}
			pattern={"[a-zA-Z]{1}"}
			onKeyUp={() => {
				if (isValid) handleKeyUp(event, index);
			}}
			onKeyDown={(e) => {
				if (e.keyCode === 8) return e.preventDefault();
				if (e.keyCode === 9) return e.preventDefault();
			}}
			onChange={handleChange}
		/>
	);
};

export default WordleGrid;
