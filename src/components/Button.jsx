export function Button({ text, onClick, ...props }) {
	return (
		<button
			className="btn btn-primary text-2xl font-bold"
			onClick={onClick}
			{...props}
		>
			{text}
		</button>
	);
}
