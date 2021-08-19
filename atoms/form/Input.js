export default function Input({ type, label, name, required = true }) {
	return (
		<div className="mb-4">
			<label for={name}>{label}</label>
			<input type={type} name={name} class="mt-2 rounded-md text-gray-900 form-input w-full" required={required ? "required" : ""} />
		</div>
	);
}
