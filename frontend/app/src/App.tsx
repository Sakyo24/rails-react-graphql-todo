import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Top from "./pages/Top";

const App = () => {
	return (
		<>
			<Header />
			<main className="pt-16">
				<Top />
			</main>
			<Footer />
		</>
	);
};

export default App;
