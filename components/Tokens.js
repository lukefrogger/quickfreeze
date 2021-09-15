import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import Modal from "@/components/Modal";
import format from "date-fns/format";
import { fetcher } from "@/services/api";
import Button from "@/atoms/Button";
import Message from "./Message";
import { supabase } from "@/services/supabase";

export default function Tokens({ tokens }) {
	const [loading, setLoading] = useState(false);
	const [fail, setFail] = useState(false);
	const [toks, setToks] = useState(tokens);
	const [showModal, setShowModal] = useState(false);
	const [deleteItem, setDeleteItem] = useState(false);

	const doAction = async (answer) => {
		if (answer === "accept") {
			await supabase.from("api_tokens").delete().match({ id: deleteItem });
			setToks(toks.filter((item) => item.id != deleteItem));
		}
		setShowModal(false);
	};

	useEffect(() => {
		setToks(tokens);
	}, [tokens]);

	const createToken = async () => {
		setLoading(true);
		setFail(false);

		try {
			const isSuccess = await fetcher("/api/create-token", supabase.auth.session().access_token, "POST");
			console.log(isSuccess);
			setToks([...toks, isSuccess.record]);
		} catch (err) {
			console.error(err);
			setFail(err || "There has been an error creating your token");
		} finally {
			setLoading(false);
		}
	};

	const deleteToken = (secret) => {
		setDeleteItem(secret);
		setShowModal(true);
	};

	if (!toks || toks.length === 0) {
		return (
			<>
				<div className="mt-4">No tokens found</div>
				<div className="mt-4">
					<Button onClick={createToken} color="primary" loading={loading}>
						Create a token
					</Button>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="flex flex-wrap w-full mt-4 text-sm">
				<div className="flex items-center w-full lg:w-1/4">Created Date</div>
				<div className="flex w-full lg:w-3/4">
					<div className="flex-1">
						<div className="flex-1">Token</div>
					</div>
					<div className="w-28 flex justify-end items-center">
						<div className="flex-1">Remove</div>
					</div>
				</div>
			</div>
			{toks.map((tok) => (
				<div className="flex flex-wrap w-full mt-4" key={tok.id}>
					<div className="flex items-center w-full lg:w-1/4">{format(new Date(tok.created), "MMM d, yyyy")}</div>
					<div className="flex w-full lg:w-3/4">
						<div className="flex-1">{tok.secret}</div>
						<div className="w-28 flex justify-end items-center">
							<div className="flex-1 text-danger ">
								<FontAwesomeIcon
									icon={faTimesCircle}
									size="lg"
									className="cursor-pointer"
									onClick={(e) => deleteToken(tok.id)}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
			{fail && (
				<div className="mb-4 mt-4">
					<Message warning={true}>{fail}</Message>
				</div>
			)}
			<div className="mt-4">
				<Button onClick={createToken} color="primary" loading={loading}>
					Create a token
				</Button>
			</div>
			<Modal
				continueText="Delete"
				modalClose={(answer) => doAction(answer)}
				visible={showModal}
				title="Deleting a Token"
				type="danger"
			>
				Are you sure you want to delete this token? Any requests made with it will no longer work.
			</Modal>
		</>
	);
}
