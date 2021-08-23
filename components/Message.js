export default function Message({ children, warning }) {
	return (
		<div
			className={`p-4 border border-${warning ? "danger" : "primary"} rounded-md bg-${warning ? "transDanger" : "transBlue"} text-${
				warning ? "white" : "bDark"
			} text-left`}
		>
			{children}
		</div>
	);
}
