export default function Message({ children, className, warning }) {
	return (
		<div
			className={`p-4 border ${warning ? "border-danger" : "border-primary"} rounded-md ${warning ? "bg-transDanger" : "bg-bDark"} ${
				warning ? "text-white" : "text-primary"
			} text-left ${className}`}
		>
			{children}
		</div>
	);
}
