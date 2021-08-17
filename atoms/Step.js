export default function Step({ children, number }) {
	return (
		<div className="flex mb-4">
			<div className="text-4xl font-extrabold text-primary">#{number}</div>
			<div className="mt-3 ml-2">{children}</div>
		</div>
	);
}
