import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Spinner({}) {
	return (
		<div className="w-full relative h-full flex justify-center">
			<FontAwesomeIcon icon={faSnowflake} spin size="4x" />
		</div>
	);
}
