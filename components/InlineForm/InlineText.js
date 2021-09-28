export default function InlineText({ label, value }) {
	return (
		<div className="flex flex-wrap w-full mt-2">
			<div className="lg:mb-4 flex items-center w-full lg:w-1/4">{label}</div>
			<div className="flex w-full lg:w-3/4">
				<div className="flex-1 font-bold">{value}</div>
			</div>
		</div>
	);
}
