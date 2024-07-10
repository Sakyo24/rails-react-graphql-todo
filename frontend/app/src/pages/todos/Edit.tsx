import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { GET_TODO } from "../../gql/queries/todosQueries";
import { UPDATE_TODO } from "../../gql/mutations/todosMutations";
import type { Todo, UpdateTodoInput } from "../../gql/graphql";

const Edit: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [todo, setTodo] = useState<Todo | null>(null);
	const [title, setTitle] = useState<string>("");
	const [detail, setDetail] = useState<string>("");
	const [isDone, setIsDone] = useState<boolean>(false);
	const [createdAt, setCreatedAt] = useState<Date | null>(null);
	const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

	const { loading, error, data } = useQuery<{ todo: Todo }>(GET_TODO, {
		variables: { id },
	});
	const [updateTodo] = useMutation(UPDATE_TODO, {});

	useEffect(() => {
		if (!loading && !error && data) {
			setTodo(data?.todo ?? null);
		}
	}, [loading, error, data]);

	useEffect(() => {
		if (todo) {
			setTitle(todo.title);
			setDetail(todo.detail);
			setIsDone(todo.isDone);
			setCreatedAt(new Date(todo.createdAt));
			setUpdatedAt(new Date(todo.updatedAt));
		}
	}, [todo]);

	const handleEditTodo = async () => {
		const updateTodoInput: UpdateTodoInput = {
			id: todo!.id,
			title,
			detail,
			isDone,
		};

		try {
			await updateTodo({
				variables: { updateTodoInput },
			});
			alert("更新しました。");
			navigate("/todos");
		} catch (error: unknown) {
			alert("更新処理に失敗しました。");
		}
	};

	return (
		<>
			{loading && <Loading />}
			{error && <Error />}

			{!loading && !error && todo && (
				<div>
					<div className="relative overflow-x-auto max-w-screen-2xl mx-auto w-10/12 shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left rtl:text-right dark:text-cyan-400">
							<tbody>
								<tr className="border-b border-cyan-200 dark:border-cyan-700">
									<th
										scope="row"
										className="w-6/12 px-6 py-4 font-medium text-cyan-900 whitespace-nowrap bg-cyan-50 dark:text-white dark:bg-cyan-800"
									>
										ID
									</th>
									<td className="px-6 py-4">{todo.id}</td>
								</tr>
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
								<tr className="border-b border-cyan-200 dark:border-cyan-700">
									<th
										scope="row"
										className="w-6/12 px-6 py-4 font-medium text-cyan-900 whitespace-nowrap bg-cyan-50 dark:text-white dark:bg-cyan-800"
									>
										Is_done
									</th>
									<td className="px-6 py-4">
										{todo.isDone}
										<input
											id="default-checkbox"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
											checked={isDone}
											onChange={(e) => setIsDone(e.target.checked)}
										/>
									</td>
								</tr>
								<tr className="border-b border-cyan-200 dark:border-cyan-700">
									<th
										scope="row"
										className="w-6/12 px-6 py-4 font-medium text-cyan-900 whitespace-nowrap bg-cyan-50 dark:text-white dark:bg-cyan-800"
									>
										Create_at
									</th>
									<td className="px-6 py-4">{createdAt?.toLocaleString()}</td>
								</tr>
								<tr className="border-b border-cyan-200 dark:border-cyan-700">
									<th
										scope="row"
										className="w-6/12 px-6 py-4 font-medium text-cyan-900 whitespace-nowrap bg-cyan-50 dark:text-white dark:bg-cyan-800"
									>
										Updated_at
									</th>
									<td className="px-6 py-4">{updatedAt?.toLocaleString()}</td>
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
							onClick={handleEditTodo}
							className="ml-5 sm:inline-flex text-white bg-green-400 hover:bg-green-300 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center cursor-pointer"
						>
							更新
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Edit;
