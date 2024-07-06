const Header = () => {
  return (
		<header className="bg-white border-b border-gray-200 fixed z-30 w-full">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						<h1 className="font-bold text-xl ">
							Ruby on Rails × React × GraphQL TODOアプリ
						</h1>
					</div>
					<div className="flex items-center">
						<div className="hidden sm:inline-flex text-white bg-cyan-400 hover:bg-cyan-300 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center cursor-pointer">
							ログイン
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header
