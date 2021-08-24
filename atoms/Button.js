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
			className={`rounded-md py-2 px-8 border ${color && `border-${color}`} ${
				type === "outline" ? "bg-transparent" : `bg-${color}`
			} ${color === "primary" && "text-white"}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
