export default function Checkbox({ children, name, small = false, required = false, value, onChange, error, disabled = false }) {
	return (
		<div className="mb-4">
			<label htmlFor={name} className="flex">
				<input
					type="checkbox"
					name={name}
					value={value}
					onChange={onChange}
					className="rounded-md text-gray-900 form-input mr-2 mt-1 leading-tight"
					required={required ? true : false}
					disable={disabled}
				/>
				<div className={`text-gray-200 ${small ? "text-sm" : ""}`}>{children}</div>
			</label>
			{error ? <div className="text-sm text-danger mt-1">{error}</div> : null}
		</div>
	);
}
