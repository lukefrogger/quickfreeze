export default function Input({ type, label, name, required = true, value, onChange, error }) {
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
				className={`mt-1 rounded-md text-gray-900 form-input w-full`}
				required={required ? "required" : ""}
			/>
			{error ? <div className="text-sm text-danger mt-1">{error}</div> : null}
		</div>
	);
}
