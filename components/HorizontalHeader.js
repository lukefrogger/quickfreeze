import Image from "next/image";
import Button from "../atoms/Button";
import icon from "../public/logo_trans.png";

export default function HorizontalHeader() {
	return (
		<header className="flex p-4 justify-between mb-8">
			<div className="flex items-center">
				<Image src={icon} alt="quick freeze logo" height={40} width={40} />
				<div className="text-2xl text-primary ml-4">Quick Freeze</div>
			</div>
			<nav className="flex text-lg">
				<div className="mr-4 p-2">Solutions</div>
				<div className="mr-4 p-2">Pricing</div>
				<div className="mr-4 p-2">Docs</div>
			</nav>
			<nav className="flex items-center">
				<div className="mr-4 text-lg">
					<Button type="link">Log In</Button>
				</div>
				<div>
					<Button color="primary">Sign Up</Button>
				</div>
			</nav>
		</header>
	);
}
