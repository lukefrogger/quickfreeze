import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BillingLimitBar({ title, limit, currentNum }) {
	const usedResource = limit < 1000 ? (currentNum / limit) * 100 : 100;

	return (
		<div className="mb-4 mt-2">
			{limit < 1000 ? (
				<div className="flex justify-between text-2xl text-semibold mb-2">
					<div className="">
						{limit}&nbsp;
						{title}
					</div>
					<div>{limit - currentNum}</div>
				</div>
			) : (
				<div className="flex justify-between text-2xl text-semibold mb-2">
					<div className="">
						<FontAwesomeIcon icon={faInfinity} />
						&nbsp;
						{title}
					</div>
					<div>{currentNum}</div>
				</div>
			)}
			<div className="flex items-center">
				<div className="flex-1 h-4 bg-white rounded-full overflow-hidden">
					<div className="bg-primary h-full" style={{ width: `${usedResource}%` }} />
				</div>
				<div className="w-32 text-gray-400 text-right">{limit < 1000 ? "left to use" : "created"}</div>
			</div>
		</div>
	);
}
