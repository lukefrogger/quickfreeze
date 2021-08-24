export default function Message({ children, warning }) {
	return (
		<div
			className={`p-4 border border-${warning ? "danger" : "primary"} rounded-md bg-${warning ? "transDanger" : "bDark"} text-${
				warning ? "white" : "primary"
			} text-left`}
		>
			{children}
		</div>
	);
}
