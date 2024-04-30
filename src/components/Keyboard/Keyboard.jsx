import "./Keyboard.scss";

import React, { useState, useEffect } from "react";

const rowOne = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const rowTwo = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const rowThree = ["Z", "X", "C", "V", "B", "N", "M"];

const Keyboard = () => {
	const [key, setKey] = useState();

	useEffect(() => {
		if (key !== null) console.log("key: ", key);
		setKey(null);
	}, [key]);

	return (
		<div className="keyboard">
			<div className="row">
				{rowOne.map((letter, index) => {
					return <Key key={index} setKey={setKey} value={letter} />;
				})}
			</div>
			<div className="row">
				{rowTwo.map((letter, index) => {
					return <Key key={index} setKey={setKey} value={letter} />;
				})}
			</div>
			<div className="row">
				<Key setKey={setKey} value={"Enter"} isUtil />
				{rowThree.map((letter, index) => {
					return <Key key={index} setKey={setKey} value={letter} />;
				})}
				<Key setKey={setKey} value={"BS"} isUtil />
			</div>
		</div>
	);
};

const Key = (props) => {
	return (
		<button
			onClick={() => props.setKey(props.value)}
			className={`${props.isUtil ? "key util" : "key"}`}>
			{props.value}
		</button>
	);
};

export default Keyboard;
