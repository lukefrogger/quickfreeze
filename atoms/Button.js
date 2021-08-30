import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";

export default function Button({ children, onClick, color, type, custom, full, loading = false }) {
	const boilerplate = `transition-all px-8 py-2 rounded-md border whitespace-nowrap relative ${full ? "w-full" : ""}`;

	if (type === "link") {
		return (
			<button {...custom} onClick={onClick} className="p-1">
				{children}
			</button>
		);
	}

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
			{...custom}
			className={`${boilerplate} ${selectType(type)} ${loading && "bg-primary-light cursor-wait"}`}
			onClick={onClick}
			disabled={loading}
		>
			<div className={`absolute w-full left-0 ${loading ? "visible" : "invisible"}`}>
				<FontAwesomeIcon icon={faSnowflake} spin size="lg" />
			</div>
			<span className={loading ? "invisible" : "visible"}>{children}</span>
		</button>
	);
}
