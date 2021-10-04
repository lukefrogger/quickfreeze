import Button from "../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { formatBytesWithLabel } from "scripts/parseBytes";

export default function PricingTable({ type = "light", setSelected, stopLoading, currentPriceId }) {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const query = async () => {
			try {
				const { data, error } = await supabase.from("products").select("*").eq("active", true).order("price", { ascending: true });
				if (error) {
					throw error;
				}

				// console.log(data);
				// setProducts(data);
				setData({
					head: [null, ...data.map((prod) => ({ price: prod.price, title: prod.name, timeframe: prod.recurring }))],
					body: [
						[{ text: "Number of API Calls" }, "Unlimited", "Unlimited", "Unlimited"],
						[{ text: "Number of Trays" }, ...data.map((prod) => (prod.numOfTrays < 99 ? prod.numOfTrays : "Unlimited"))],
						[{ text: "Max Tray Size" }, ...data.map((prod) => formatBytesWithLabel(prod.traySize))],
						[
							{ text: "Quick Freeze Storage", tip: "Once data a read from a tray, it is automatically deleted" },
							true,
							true,
							true,
						],
						[
							{
								text: "Deep Freeze Storage",
								tip: "Data can be read from a tray as many times as needed",
							},
							...data.map((prod) => prod.deepFreeze),
						],
						[
							{
								text: "Data Retention",
								tip: "The length of time between when the data is created and when it will be automatically deleted",
							},
							...data.map((prod) => `${prod.expirationLimit} days`),
						],
						[
							{
								text: "Custom Data Retention",
								tip: "Set custom lengths of time where data will automatically be removed from a tray",
							},
							...data.map((prod) => prod.customExpirationLimit),
						],
					],
					ids: data.map((prod) => prod.stripe_price),
				});
			} catch (err) {
				console.log(err);
				// setFail(err.message || "You're trays couldn't be found");
			}
		};

		query();
	}, []);

	// Catstrphic failure time
	useEffect(() => {
		if (stopLoading === true) {
			setLoading(false);
		}
	}, [stopLoading]);

	const startPlan = (id) => {
		setLoading(true);
		setSelected(id);
	};

	const check = <FontAwesomeIcon icon={faCheckCircle} size="2x" />;
	const close = <FontAwesomeIcon icon={faTimes} size="2x" />;

	return (
		<div className="overflow-x-auto">
			<table className="table-auto w-full">
				<thead>
					<tr className="border-b-1 border-gray-400">
						{data.head &&
							data.head.map((item, i) => {
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
					{data.body &&
						data.body.map((row, i) => (
							<tr
								className={`border border-l-0 border-r-0 border-b-0 border-gray-300 ${
									type === "light" ? "text-gray-600" : "text-gray-200"
								}`}
								key={i}
							>
								{row.map((item, xi) => {
									return (
										<td className={`py-4 pr-12 ${item === true ? "text-primary" : "text-normal"}`} key={xi}>
											{item === true && check}
											{item === false && close}
											{item.text && item.tip ? (
												<div className="flex relative items-center">
													{item.text}
													<div className="flex flex-col items-center group">
														<svg className="w-6 h-6 ml-4" viewBox="0 0 20 20" fill="currentColor">
															<path
																fillRule="evenodd"
																d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
																clipRule="evenodd"
															/>
														</svg>
														<div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex ">
															<span className="relative z-10 p-2 text-sm text-darkPrimary whitespace-no-wrap bg-white rounded-md bg-primary">
																{item.tip}
															</span>
															<div className="w-3 h-3 -mt-2 rotate-45 bg-primary"></div>
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
						{data.ids &&
							data.ids.map((id, i) => {
								if (currentPriceId === id) {
									return (
										<div className="mt-8 font-semibold text-primary" key={i}>
											Current Plan
										</div>
									);
								} else if (i % 2 != 0) {
									// Is odd
									return (
										<td className="pt-6" key={i}>
											<Button
												type="outline"
												color={type === "light" ? "primary" : `white`}
												onClick={() => startPlan(id)}
												loading={loading}
											>
												Sign Up
											</Button>
										</td>
									);
								} else {
									return (
										<td className="pt-6" key={i}>
											<Button color="primary" onClick={() => startPlan(id)} loading={loading}>
												Sign Up
											</Button>
										</td>
									);
								}
							})}
					</tr>
				</tbody>
			</table>
		</div>
	);
}
