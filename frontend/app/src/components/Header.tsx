import { Link } from "react-router-dom"

const Header = () => {
  return (
		<header className="bg-white border-b border-gray-200 fixed z-30 w-full">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<Link
						to="/"
						className="flex items-center justify-start"
					>
						<h1 className="font-bold text-xl ">
							Ruby on Rails × React × GraphQL TODOアプリ
						</h1>
					</Link>
					{/* <div className="flex items-center">
						<Link
							to="/register"
							className="ml-5 sm:inline-flex text-white bg-cyan-400 hover:bg-cyan-300 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center cursor-pointer"
						>
							会員登録
						</Link>
						<Link
							to="/login"
							className="ml-5 sm:inline-flex text-white bg-cyan-400 hover:bg-cyan-300 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center cursor-pointer"
						>
							ログイン
						</Link>
					</div> */}
				</div>
			</div>
		</header>
	);
}

export default Header
