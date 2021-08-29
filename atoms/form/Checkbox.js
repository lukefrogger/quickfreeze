export default function Checkbox({ children, name, small = false, required = false, value, onChange, error }) {
	return (
		<div className="mb-4">
			<label htmlFor={name}>
				<input
					type="checkbox"
					name={name}
					value={value}
					onChange={onChange}
					className="rounded-md text-gray-900 form-input mr-2 leading-tight"
					required={required ? true : false}
				/>
				<span className={`text-gray-200 ${small ? "text-sm" : ""}`}>{children}</span>
			</label>
			{error ? <div className="text-sm text-danger mt-1">{error}</div> : null}
		</div>
	);
}
