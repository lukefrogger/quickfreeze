export default function Checkbox({ children, name, small = false, required = false, value, onChange, error, disabled = false, helpText }) {
	return (
		<div className="mb-4">
			<label className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
				<input
					type="checkbox"
					name={name}
					value={value}
					onChange={onChange}
					className={`rounded-md text-gray-900 form-input mr-2 mb-1 leading-tight ${disabled ? "bg-gray-400" : "bg-white"}`}
					required={required ? "required" : ""}
					disabled={disabled}
				/>
				<span className={`${disabled ? "text-gray-300" : "text-gray-200"} ${small ? "text-sm" : ""}`}>{children}</span>
			</label>
			{helpText && !error ? <div className="text-sm mt-1 text-gray-400">{helpText}</div> : null}
			{error ? <div className="text-sm text-danger mt-1">{error}</div> : null}
		</div>
	);
}
