export function VertLabeledIcon({ icon, label, color }) {
	return (
		<div className="flex flex-col items-center mx-4 my-4">
			<div
				className={`flex items-center p-3 justify-center border border-${color} rounded-full text-${color} bg-white bg-opacity-10`}
			>
				{icon}
			</div>
			<div className={`text-xl mt-4 text-${color} text-center`}>{label}</div>
		</div>
	);
}
