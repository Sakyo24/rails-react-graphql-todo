import { Link } from "react-router-dom";

const Top = () => {
	return (
		<div className="top-page text-center flex items-center">
			<div className="w-screen text-5xl">
				<p className="text-cyan-400">
					Ruby on Rails × React × GraphQL TODOアプリ
				</p>
				<Link
					to="/todos"
					className="sm:inline-flex text-white bg-cyan-400 hover:bg-cyan-300 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center cursor-pointer"
				>
					Get Start
				</Link>
			</div>
		</div>
	);
};

export default Top;
