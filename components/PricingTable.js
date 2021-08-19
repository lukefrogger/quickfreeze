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
			["Number of API Calls", "Unlimited", "Unlimited", "Unlimited"],
			["Number of Buckets", "3 Buckets", "5 Buckets", "Unlimited"],
			["Max Bucket Size", "100 kilobytes", "100 megabytes", "1 gigabyte"],
			["Quick Freeze Storage", true, true, true],
			["Deep Freeze Storage", false, true, true],
			["Length of Storage", "15 days", "30 days", "Forever"],
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
									{item === false ? close : item}
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
