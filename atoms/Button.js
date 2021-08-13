export default function Button({ children, onClick, color, type }) {
	if (type === "link") {
		return (
			<button onClick={onClick} className="p-1">
				{children}
			</button>
		);
	}
	return (
		<button
			className={`rounded-sm py-2 px-8 border border-${color} bg-${type === "outline" ? "transparent" : color}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
