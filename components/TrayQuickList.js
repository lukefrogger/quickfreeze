import Fab from "@/atoms/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import Input from "@/atoms/form/Input";
import { useEffect, useState } from "react";
import Card from "@/atoms/Card";
// import { supabase } from "@/services/supabase";

export default function TrayQuickList({}) {
	const [term, setTerm] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// supabase.from("trays").select("name");
		console.log("get trays, order by last viewed");
	}, []);

	useEffect(() => {
		if (term) {
			console.log(term);
		}
	}, [term]);

	const newTray = () => {
		console.log("new tray create");
	};

	return (
		<div className="w-96 pr-6">
			<Card>
				<div className="flex justify-between items-center">
					<div className="text-primary font-bold text-xl">All Trays</div>
					<Fab color="primary" onClick={newTray}>
						<FontAwesomeIcon icon={faPlus} />
					</Fab>
				</div>
				<div className="mt-2">
					<Input
						type="text"
						name="search"
						value={term}
						placeHolder="Search for a tray..."
						icon={<FontAwesomeIcon icon={faSearch} size="lg" />}
						onChange={(e) => setTerm(e.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					{["Fetch Forms temp", "Saleforce migration #1", "mig test"].map((item, i) => (
						<div className="p-2 hover:bg-white hover:bg-opacity-20 rounded-sm cursor-pointer" key={i}>
							{item}
						</div>
					))}
				</div>
			</Card>
		</div>
	);
}
