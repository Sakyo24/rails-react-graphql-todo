import { Link } from "react-router-dom";

const Index = () => {
	const todos = [
		{
			id: 1,
			title: "title1",
			is_done: true,
			created_at: "2024-01-01 00:00:00",
			updated_at: "2024-01-01 00:00:00",
		},
		{
			id: 2,
			title: "title2",
			is_done: false,
			created_at: "2024-01-01 00:00:00",
			updated_at: "2024-01-01 00:00:00",
		},
	];

	return (
		<div>
			<div className="relative overflow-x-auto max-w-screen-2xl mx-auto">
				<table className="w-full text-sm text-left rtl:text-right dark:text-cyan-400">
					<thead className="text-xs text-cyan-700 bg-cyan-50 dark:bg-cyan-700 dark:text-cyan-400">
						<tr>
							<th scope="col" className="px-6 py-3 w-5">
								ID
							</th>
							<th scope="col" className="px-6 py-3">
								Title
							</th>
							<th scope="col" className="px-6 py-3 w-5">
								Is_done
							</th>
							<th scope="col" className="px-6 py-3 w-48">
								Created_at
							</th>
							<th scope="col" className="px-6 py-3 w-48">
								Updated_at
							</th>
							<th scope="col" className="px-6 py-3 w-60"></th>
						</tr>
					</thead>
					<tbody>
						{todos?.map((todo) => {
							return (
								<tr
									className="bg-white border-b dark:bg-cyan-800 dark:border-cyan-700"
									key={todo.id}
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
									>
										{todo.id}
									</th>
									<td className="px-6 py-4">{todo.title}</td>
									<td className="px-6 py-4">
										{todo.is_done && (
											<svg
												className="w-6 h-6 text-cyan-500 dark:text-white"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												fill="none"
												viewBox="0 0 24 24"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M5 11.917 9.724 16.5 19 7.5"
												/>
											</svg>
										)}
										{!todo.is_done && (
											<svg
												className="w-6 h-6 text-gray-500 dark:text-white"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												fill="none"
												viewBox="0 0 24 24"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M5 11.917 9.724 16.5 19 7.5"
												/>
											</svg>
										)}
									</td>
									<td className="px-6 py-4">{todo.created_at}</td>
									<td className="px-6 py-4">{todo.updated_at}</td>
									<td className="px-6 py-4 flex">
										<Link
											to="#"
											className="ml-5 sm:inline-flex text-white bg-green-400 hover:bg-green-300 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center cursor-pointer"
										>
											編集
										</Link>
										<Link
											to="#"
											className="ml-5 sm:inline-flex text-white bg-red-400 hover:bg-red-300 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center cursor-pointer"
										>
											削除
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Index;
