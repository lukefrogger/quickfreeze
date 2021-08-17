export default function Solutions({ title, text }) {
	return (
		<div className="rounded-md border border-primary p-4 bg-transBlue">
			<div className="text-xl mb-4">{title}</div>
			<p>{text}</p>
		</div>
	);
}
