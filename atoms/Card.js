export default function Card({ children, isButton, onClick }) {
	const clicked = (e) => {
		if (isButton) {
			onClick(e);
		}
	};
	return (
		<div className={`bg-bLight border border-gray-500 p-4 rounded-md ${isButton ? "cursor-pointer" : ""}`} onClick={clicked}>
			{children}
		</div>
	);
}
