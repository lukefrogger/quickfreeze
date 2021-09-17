export default function BillingLimitBar({ title, limit, currentNum }) {
	return (
		<div className="mb-4 mt-2">
			<div className="flex justify-between text-2xl text-semibold mb-2">
				<div className="">
					{limit}&nbsp;
					{title}
				</div>
				<div>{limit - currentNum}</div>
			</div>
			<div className="flex items-center">
				<div className="flex-1 h-4 bg-white rounded-full overflow-hidden">
					<div className="bg-primary h-full" style={{ width: `${(currentNum / limit) * 100}%` }} />
				</div>
				<div className="w-32 text-gray-400 text-right">left to use</div>
			</div>
		</div>
	);
}
