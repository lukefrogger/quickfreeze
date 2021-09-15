import NumberFormat from "react-number-format";

export default function Phone({ label, name, required, value, onChange, error, helpText, icon, placeHolder }) {
	return (
		<div className="mb-4 relative">
			{label && (
				<label htmlFor={name} className="text-gray-200">
					{label}
				</label>
			)}
			<NumberFormat
				name={name}
				value={value}
				onValueChange={onChange}
				className={`mt-1 rounded-md form-input w-full bg-lightWhite placeholder-gray-400`}
				required={required ? "required" : ""}
				placeholder={placeHolder || ""}
				format="###-###-####"
			/>

			{icon && <span className="h-4 w-4 absolute right-4 top-3 mt-px text-gray-300">{icon}</span>}
			{helpText && !error ? <div className="text-sm mt-1 text-gray-400">{helpText}</div> : null}
			{error ? <div className="text-sm text-danger mt-1">{error}</div> : null}
		</div>
	);
}
