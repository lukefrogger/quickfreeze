import Button from "../atoms/Button";

export default function PricingTable({ type = "light" }) {
	const data = {
		head: [
			null,
			{ price: 0, title: "Free", timeframe: "forever" },
			{ price: 5, title: "Basic", timeframe: "month" },
			{ price: 10, title: "Pro", timeframe: "month" },
		],
		body: [
			[{ text: "Number of API Calls" }, "Unlimited", "Unlimited", "Unlimited"],
			[{ text: "Number of Buckets" }, "3 Buckets", "5 Buckets", "Unlimited"],
			[{ text: "Max Bucket Size" }, "100 kilobytes", "100 megabytes", "1 gigabyte"],
			[{ text: "Quick Freeze Storage", tip: "Once data a read from a bucket, it is automatically deleted" }, true, true, true],
			[
				{
					text: "Deep Freeze Storage",
					tip: "Data can be stored for as long as needed and read from a bucket as many times as needed",
				},
				false,
				true,
				true,
			],
			[
				{
					text: "Max Expiration Date",
					tip: "The length of time between when the data is created and when it will be automatically deleted",
				},
				"15 days",
				"30 days",
				"60 days",
			],
			[
				{
					text: "Custom Expiration Date",
					tip: "Set custom lengths of time where data will automatically be removed from a bucket",
				},
				false,
				false,
				true,
			],
		],
	};
	const rowPadding = "py-4";
	const check = (
		<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clipRule="evenodd"
			/>
		</svg>
	);
	const close = (
		<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
			<path
				fillRule="evenodd"
				d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
				clipRule="evenodd"
			/>
		</svg>
	);

	const signUp = (id) => {
		console.log("sign up with id", id);
	};

	return (
		<table className="table-auto w-full">
			<thead>
				<tr className="border-b-1 border-gray-400">
					{data.head.map((item, i) => {
						if (item) {
							return (
								<th className="text-left pb-6" key={i}>
									<div className="text-3xl">{item.title}</div>
									<div className={`font-normal ${type === "light" ? "text-gray-500" : "text-primary"}`}>
										${item.price} / {item.timeframe}
									</div>
								</th>
							);
						}
						return <th key={i}>&nbsp;</th>;
					})}
				</tr>
			</thead>
			<tbody>
				{data.body.map((row, i) => (
					<tr
						className={`border border-l-0 border-r-0 border-b-0 border-gray-300 ${
							type === "light" ? "text-gray-600" : "text-gray-200"
						}`}
						key={i}
					>
						{row.map((item, xi) => {
							return (
								<td className={`${rowPadding} pr-12 ${item === true ? "text-primary" : "text-normal"}`} key={xi}>
									{item === true && check}
									{item === false && close}
									{item.text && item.tip ? (
										<div className="flex relative">
											{item.text}
											<div className="flex flex-col items-center group">
												<svg className="w-6 h-6 ml-4" viewBox="0 0 20 20" fill="currentColor">
													<path
														fillRule="evenodd"
														d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
														clipRule="evenodd"
													/>
												</svg>
												<div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
													<span className="relative z-10 p-2 text-sm text-bDark whitespace-no-wrap bg-white rounded-sm">
														{item.tip}
													</span>
													<div className="w-3 h-3 -mt-2 rotate-45 bg-white"></div>
												</div>
											</div>
										</div>
									) : (
										item.text
									)}
									{item !== true && item !== false && !item.text && item}
								</td>
							);
						})}
					</tr>
				))}
				<tr className="border border-l-0 border-r-0 border-b-0 border-gray-300">
					<td className="pt-6">&nbsp;</td>
					<td className="pt-6">
						<Button type="outline" onClick={() => signUp("free")}>
							Sign Up
						</Button>
					</td>
					<td className="pt-6">
						<Button color="primary" onClick={() => signUp("basic")}>
							Sign Up
						</Button>
					</td>
					<td className="pt-6">
						<Button type="outline" onClick={() => signUp("pro")}>
							Sign Up
						</Button>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
