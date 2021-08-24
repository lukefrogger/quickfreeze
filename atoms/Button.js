export default function Button({ children, onClick, color, type, custom }) {
	if (type === "link") {
		return (
			<button {...custom} onClick={onClick} className="p-1">
				{children}
			</button>
		);
	}
	return (
		<button
			{...custom}
			className={`rounded-sm py-2 px-8 border border-${color} ${type === "bg-outline" ? "bg-transparent" : color} ${
				color === "text-primary" && "text-white"
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
