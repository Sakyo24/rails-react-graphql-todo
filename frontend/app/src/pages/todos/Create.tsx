import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_TODOS } from "../../gql/queries/todosQueries";
import { CREATE_TODO } from "../../gql/mutations/todosMutations";
import type { CreateTodoInput } from "../../gql/graphql";

const Create: React.FC = () => {
	const navigate = useNavigate();

	const [title, setTitle] = useState<string>("");
	const [detail, setDetail] = useState<string>("");

	const [createTodo] = useMutation(CREATE_TODO, {});

	const handleCreateTodo = async () => {
		const createTodoInput: CreateTodoInput = {
			title,
			detail,
		};

		try {
			await createTodo({
				variables: { createTodoInput },
				refetchQueries: [GET_TODOS],
			});
			alert("作成しました。");
			navigate("/todos");
		} catch (error: unknown) {
			alert("作成処理に失敗しました。");
		}
	};

	return (
		<>
			<div>
				<div className="relative overflow-x-auto max-w-screen-2xl mx-auto w-10/12 shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left rtl:text-right dark:text-cyan-400">
						<tbody>
							<tr className="border-b border-cyan-200 dark:border-cyan-700">
								<th
									scope="row"
									className="w-6/12 px-6 py-4 font-medium text-cyan-900 whitespace-nowrap bg-cyan-50 dark:text-white dark:bg-cyan-800"
								>
									Title
								</th>
								<td className="px-6 py-4">
									<input
										type="text"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Title"
										required
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</td>
							</tr>
							<tr className="border-b border-cyan-200 dark:border-cyan-700">
								<th
									scope="row"
									className="w-6/12 px-6 py-4 font-medium text-cyan-900 whitespace-nowrap bg-cyan-50 dark:text-white dark:bg-cyan-800"
								>
									Detail
								</th>
								<td className="px-6 py-4">
									<textarea
										id="message"
										rows={4}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Detail"
										value={detail}
										onChange={(e) => setDetail(e.target.value)}
									></textarea>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="mt-5 max-w-screen-2xl mx-auto w-10/12 flex justify-between">
					<Link
						to="/todos"
						className="ml-5 sm:inline-flex text-white bg-cyan-400 hover:bg-cyan-300 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center cursor-pointer"
					>
						一覧
					</Link>
					<div
						onClick={handleCreateTodo}
						className="ml-5 sm:inline-flex text-white bg-blue-400 hover:bg-blue-300 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center cursor-pointer"
					>
						作成
					</div>
				</div>
			</div>
		</>
	);
};

export default Create;
