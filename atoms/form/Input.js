export default function Input({ type, label, name, required = true }) {
	return (
		<div className="mb-4">
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				className="mt-2 rounded-md text-gray-900 form-input w-full"
				required={required ? "required" : ""}
			/>
		</div>
	);
}
