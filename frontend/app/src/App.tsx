import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import TodosIndex from "./pages/todos/Index";
import Top from "./pages/Top";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: import.meta.env.VITE_API_URL,
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<ApolloProvider client={client} >
			<BrowserRouter>
				<Header />
				<main className="pt-16">
					<Routes>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/todos" element={<TodosIndex />} />
						<Route path="/" element={<Top />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</ApolloProvider>
	);
};

export default App;
