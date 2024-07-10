import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Top from "./pages/Top";
import TodosIndex from "./pages/todos/Index";
import TodosCreate from "./pages/todos/Create";
import TodosEdit from "./pages/todos/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: import.meta.env.VITE_API_URL,
	cache: new InMemoryCache(),
});

const App: React.FC = () => {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Header />
				<main className="pt-16">
					<Routes>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/todos" element={<TodosIndex />} />
						<Route path="/todos/create" element={<TodosCreate />} />
						<Route path="/todos/:id/edit" element={<TodosEdit />} />
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
