const Spinner = () => {
	return (
		<div className="d-flex vh-100 align-items-center justify-content-center">
			{" "}
			<div
				className="spinner-border text-danger"
				role="status"
				id="spinner"
			>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;
