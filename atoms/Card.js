export default function Card({ children, isButton, onClick, className }) {
	const clicked = (e) => {
		if (isButton) {
			onClick(e);
		}
	};
	return (
		<div
			className={`bg-bLight border border-gray-500 p-4 rounded-md ${isButton ? "cursor-pointer" : ""} ${className || ""}`}
			onClick={clicked}
		>
			{children}
		</div>
	);
}
