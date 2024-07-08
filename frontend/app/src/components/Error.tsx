const Error: React.FC = () => {
	return (
		<div>
			<div
				className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-auto max-w-lg rounded"
				role="alert"
			>
				<strong className="font-bold">Error!</strong>
				<br />
				<span className="block sm:inline">
					エラーが発生しました。時間をおいて、再度実行して下さい。
				</span>
			</div>
		</div>
	);
};

export default Error
