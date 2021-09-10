import Fab from "@/atoms/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import Input from "@/atoms/form/Input";
import { useEffect, useState } from "react";
import Card from "@/atoms/Card";
import Spinner from "@/atoms/Spinner";
import Message from "./Message";
import { supabase } from "@/services/supabase";
import router from "next/router";

export default function TrayQuickList({}) {
	const [term, setTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [wholeList, setWholeList] = useState(false);
	const [filteredList, setFilteredList] = useState([]);
	const [fail, setFail] = useState(false);

	useEffect(() => {
		setLoading(true);
		const query = async () => {
			try {
				const { data, error } = await supabase.from("trays").select("name, endpoint").order("created", { ascending: false });
				if (error) {
					throw error;
				}

				setWholeList(data);
				if (data.length > 8) {
					setFilteredList(data.slice(7));
				} else {
					setFilteredList(data);
				}
			} catch (err) {
				console.log(err);
				setFail(err.message || "You're trays couldn't be found");
			} finally {
				setLoading(false);
			}
		};

		query();
	}, []);

	useEffect(() => {
		if (!wholeList) {
			return;
		}

		if (term) {
			setFilteredList(wholeList.filter((item) => item.name.includes(term)));
		} else {
			if (wholeList.length > 8) {
				setFilteredList(wholeList.slice(7));
			} else {
				setFilteredList(wholeList);
			}
		}
	}, [term]);

	const newTray = () => {
		router.push("/app/tray/new");
	};
	const goToTray = (endpoint) => {
		router.push(`/app/tray/${endpoint}`);
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
					{fail && <Message warning={true}>{fail}</Message>}
					{!fail && loading && <Spinner size="3x" />}
					{!fail && !loading && wholeList.length > 0 ? (
						filteredList.map((item, i) => (
							<div
								className="p-2 hover:bg-white hover:bg-opacity-20 rounded-sm cursor-pointer"
								key={item.endpoint}
								onClick={() => goToTray(item.endpoint)}
							>
								{item.name}
							</div>
						))
					) : (
						<div className="p-2">You don't have any trays</div>
					)}
				</div>
			</Card>
		</div>
	);
}
