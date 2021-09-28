export default function Fab({ children, onClick, color }) {
	const boilerplate = `transition-all p-8 flex justify-center items-center rounded-full border whitespace-nowrap`;

	const selectType = (styleType) => {
		if (color === "primary") {
			return `border-primary ${styleType === "outline" ? "bg-transparent" : `bg-primary`} text-white`;
		} else if (color === "white") {
			return `border-white ${styleType === "outline" ? "bg-transparent" : "g-white"} ${
				styleType === "outline" ? "text-white" : "text-bDark"
			}`;
		} else {
			return `border-bDark ${styleType === "outline" ? "bg-transparent" : "bg-bDark"} ${
				styleType === "outline" ? "text-bDark" : "text-whit"
			}`;
		}
	};

	return (
		<button
			className={`transition-all h-10 w-10 flex justify-center items-center rounded-full border whitespace-nowrap ${selectType(
				color
			)}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
