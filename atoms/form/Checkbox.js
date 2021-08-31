export default function Checkbox({ children, name, small = false, required = false, value, onChange, error, disabled = false }) {
	return (
		<div className="mb-4">
			<label className="">
				<input
					type="checkbox"
					name={name}
					value={value}
					onChange={onChange}
					className="rounded-md text-gray-900 form-input mr-2 mb-1 leading-tight"
					required={required ? true : false}
					disable={disabled}
				/>
				<span className={`text-gray-200 ${small ? "text-sm" : ""}`}>{children}</span>
			</label>
			{error ? <div className="text-sm text-danger mt-1">{error}</div> : null}
		</div>
	);
}
