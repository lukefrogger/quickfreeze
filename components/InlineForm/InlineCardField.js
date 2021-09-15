import Button from "@/atoms/Button";
import Input from "@/atoms/form/Input";
import Phone from "@/atoms/form/Phone";
import Select from "@/atoms/form/Select";
import { useEffect, useState } from "react";

export default function InlineCardField({ initialValue, label, saveChange, type = "text" }) {
	const [value, setValue] = useState(initialValue);
	const [changed, setChanged] = useState(false);
	const [loading, setLoading] = useState(false);
	const [phoneError, setPhoneError] = useState(false);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const changeValue = (newValue) => {
		if (newValue === value) {
			setChanged(false);
		} else {
			setChanged(newValue);
		}
	};

	const changePhone = (obj) => {
		// Do stuff with phone
		setPhoneError(false);
		if (obj.value === value) {
			setChanged(false);
		} else {
			setChanged(obj.value);
		}
	};

	const update = async () => {
		if (type === "phone" && changed.length !== 10) {
			return setPhoneError("You must enter a valid phone number");
		}
		setLoading(true);
		await saveChange(changed);
		setValue(changed);
		setChanged(false);
		setLoading(false);
	};

	return (
		<div className="flex flex-wrap w-full mt-4">
			<div className="lg:mb-4 flex items-center w-full lg:w-1/4">{label}</div>
			<div className="flex w-full lg:w-3/4">
				<div className="flex-1">
					{type === "select" && (
						<Select onChange={(e) => changeValue(e.target.value)} value={changed || value}>
							<option value={false}>Quick Freeze</option>
							<option value={true}>Deep Freeze</option>
						</Select>
					)}
					{type === "text" && <Input value={changed || value || ""} type="text" onChange={(e) => changeValue(e.target.value)} />}
					{type === "phone" && (
						<Phone value={changed || value || ""} onChange={(valObj) => changePhone(valObj)} error={phoneError} />
					)}
				</div>
				<div className="w-32 mb-3 flex justify-end items-center">
					<div className={`${changed ? "block" : "hidden"}`}>
						<Button color="primary" onClick={update} loading={loading}>
							Save
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
