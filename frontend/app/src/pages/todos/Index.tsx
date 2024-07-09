import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Todo } from "../../gql/graphql";

const GET_TODOS = gql`
	query getTodos($after: String!) {
		todos(first: 10, after: $after) {
			nodes {
				id
				title
				detail
				isDone
				createdAt
				updatedAt
			}
			pageInfo {
				endCursor
				hasNextPage
				startCursor
				hasPreviousPage
			}
			totalCount
		}
	}
`;

const Index: React.FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);
	const [pageNumbers, setPageNumbers] = useState<number[]>([1]);

	type TodoPageInfo = {
		nodes: Todo[];
		pageInfo: {
			startCursor: string;
			endCoursor: string;
			hasNextPage: boolean;
			hasPreviousPage: boolean;
		};
		totalCount: number;
	};

	const { loading, error, data } = useQuery<{ todos: TodoPageInfo }>(
		GET_TODOS,
		{
			variables: { after: String(currentPage * 10 - 10) },
		}
	);

	useEffect(() => {
		if (!loading && !error && data) {
			setTotalPage(data.todos.totalCount / 10);
		}
	}, [loading, error, data]);

	useEffect(() => {
		const array: number[] = [];
		for (let i = 1; i <= totalPage; i++) {
			array.push(i);
		}
		setPageNumbers(array);

	}, [totalPage]);

	const handleToPage = (page: number) => {
		if (page === 0 || page === totalPage + 1) return;
		setCurrentPage(page);
	};

	return (
		<>
			{loading && <Loading />}
			{error && <Error />}

			{!loading && !error && (
				<div>
					<div className="mb-5 max-w-screen-2xl mx-auto w-10/12">
						{data?.todos?.totalCount} 件
					</div>

					<div className="relative overflow-x-auto max-w-screen-2xl mx-auto w-10/12">
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
								{data?.todos?.nodes?.map((todo: Todo) => {
									const createdAt = new Date(todo.createdAt);
									const updatedAt = new Date(todo.updatedAt);

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
												{todo.isDone && (
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
												{!todo.isDone && (
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
											<td className="px-6 py-4">
												{createdAt.toLocaleString()}
											</td>
											<td className="px-6 py-4">
												{updatedAt.toLocaleString()}
											</td>
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

					<div className="flex justify-center mt-10 mb-5">
						<nav aria-label="Pagination">
							<ul className="inline-flex items-center space-x-2 rounded-md text-sm">
								<li onClick={() => handleToPage(currentPage - 1)}>
									<span
										className={
											currentPage === 1
												? "inline-flex items-center space-x-2 rounded-md border border-cyan-300 bg-white px-4 py-2 font-medium text-cyan-500 bg-gray-200"
												: "inline-flex items-center space-x-2 rounded-md border border-cyan-300 bg-white px-4 py-2 font-medium text-cyan-500 cursor-pointer hover:bg-cyan-50"
										}
									>
										<svg
											className="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
								</li>

								{pageNumbers.map((page) => {
									if (
										page === 1 ||
										page === 2 ||
										page === currentPage ||
										page === currentPage - 1 ||
										page === currentPage + 1 ||
										page === totalPage - 1 ||
										page === totalPage
									) {
										return (
											<li onClick={() => handleToPage(page)} key={page}>
												<span
													aria-current="page"
													className={
														currentPage === page
															? "z-10 inline-flex items-center rounded-md bg-cyan-100 px-4 py-2 font-medium text-cyan-700"
															: "inline-flex items-center rounded-md bg-white px-4 py-2 text-cyan-500 cursor-pointer hover:bg-cyan-50"
													}
												>
													{page}{" "}
												</span>
											</li>
										);
									} else if (
										page === currentPage - 2 ||
										page === currentPage + 2
									) {
										return (
											<li key={page}>
												<span
													aria-current="page"
													className="inline-flex items-center rounded-md bg-white px-4 py-2 text-cyan-500"
												>
													...{" "}
												</span>
											</li>
										);
									}
								})}

								<li onClick={() => handleToPage(currentPage + 1)}>
									<span
										className={
											currentPage === totalPage
												? "inline-flex items-center space-x-2 rounded-md border border-cyan-300 bg-white px-4 py-2 font-medium text-cyan-500 bg-gray-200"
												: "inline-flex items-center space-x-2 rounded-md border border-cyan-300 bg-white px-4 py-2 font-medium text-cyan-500 cursor-pointer hover:bg-cyan-50"
										}
									>
										<svg
											className="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			)}
		</>
	);
};

export default Index;
