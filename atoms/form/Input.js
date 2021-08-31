export default function Input({ type, label, name, required = true, value, onChange, error, helpText }) {
	return (
		<div className="mb-4">
			<label htmlFor={name} className="text-gray-200">
				{label}
			</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className={`mt-1 rounded-md text-gray-600 form-input w-full`}
				required={required ? "required" : ""}
				autoComplete="false"
			/>
			{helpText && !error ? <div className="text-sm mt-1 text-gray-400">{helpText}</div> : null}
			{error ? <div className="text-sm text-danger mt-1">{error}</div> : null}
		</div>
	);
}
