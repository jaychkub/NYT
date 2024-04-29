import "./App.scss";

import Header from "./components/Header/Header";
import Wordle from "./pages/Wordle/Wordle";

function App() {
	return (
		<div className="app">
			<Header />
			<Wordle />
		</div>
	);
}

export default App;
