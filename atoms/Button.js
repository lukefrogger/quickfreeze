export default function Button({ children, onClick, color, type, custom, full }) {
	const classes = `px-8 py-2 rounded-md border whitespace-nowrap ${full ? "w-full" : ""}`;

	if (type === "link") {
		return (
			<button {...custom} onClick={onClick} className="p-1">
				{children}
			</button>
		);
	}

	if (color === "primary") {
		return (
			<button
				{...custom}
				className={`${classes} border-primary ${type === "outline" ? "bg-transparent" : `bg-primary`} text-white`}
				onClick={onClick}
			>
				{children}
			</button>
		);
	} else if (color === "white") {
		return (
			<button
				{...custom}
				className={`${classes} border-white ${type === "outline" ? "bg-transparent" : `bg-white`} ${
					type === "outline" ? "text-white" : `text-bDark`
				}`}
				onClick={onClick}
			>
				{children}
			</button>
		);
	} else {
		return (
			<button
				{...custom}
				className={`${classes} border-bDark ${type === "outline" ? "bg-transparent" : `bg-bDark`} ${
					type === "outline" ? "text-bDark" : `text-white`
				}`}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}

	// return (
	// 	<button
	// 		{...custom}
	// 		className={`pt-2 pb-2 pr-8 pl-8 rounded-md border ${color && `border-${color}`} ${
	// 			type === "outline" ? "bg-transparent" : `bg-${color}`
	// 		} ${color === "primary" && "text-white"}`}
	// 		onClick={onClick}
	// 	>
	// 		{children}
	// 	</button>
	// );
}
