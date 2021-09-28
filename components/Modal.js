import Button from "@/atoms/Button";
import { faExclamation, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Modal({ children, title, type, cancelText, continueText, modalClose, visible }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(visible);
	}, [visible]);

	const cancel = () => {
		modalClose("cancel");
		setShow(false);
	};

	const accept = () => {
		modalClose("accept");
		setShow(false);
	};

	return (
		<div
			className={`fixed inset-0 overflow-y-auto ${show ? "z-50 block" : "z-0 hidden"}`}
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
					&#8203;
				</span>
				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div
								className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
									type === "danger" ? "bg-red-100" : "bg-transBlue"
								} sm:mx-0 sm:h-10 sm:w-10`}
							>
								<FontAwesomeIcon
									className={`h-6 w-6 ${type === "danger" ? "text-red-600" : "text-primary"}`}
									icon={type === "danger" ? faExclamationTriangle : faExclamation}
									aria-hidden="true"
								/>
							</div>
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3 className="mt-2 text-lg leading-6 font-medium text-gray-900">{title}</h3>
								<div className="mt-2 text-gray-900">{children}</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex justify-end">
						<Button onClick={cancel} color="primary" type="outline">
							{cancelText || "Cancel"}
						</Button>
						&nbsp;
						<Button onClick={accept} color="primary">
							{continueText || "Continue"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
