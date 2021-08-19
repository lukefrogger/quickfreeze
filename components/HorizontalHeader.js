import Image from "next/image";
import Link from "next/link";
import Button from "../atoms/Button";
import Container from "../atoms/container";
import icon from "../public/logo_trans.png";

export default function HorizontalHeader() {
	return (
		<Container>
			<header className="flex p-4 justify-between mb-8">
				<div className="flex items-center cursor-pointer">
					<Link href="/">
						<Image src={icon} alt="quick freeze logo" height={40} width={40} />
					</Link>
					<Link href="/">
						<div className="text-2xl text-primary ml-4">Quick Freeze</div>
					</Link>
				</div>
				<nav className="flex text-lg">
					{/* <div className="mr-4 p-2">Solutions</div> */}
					<div className="mr-4 p-2">
						<Link href="/pricing">Pricing</Link>
					</div>
					<div className="mr-4 p-2">
						<Link href="/docs">Docs</Link>
					</div>
				</nav>
				<nav className="flex items-center">
					{/* <Link href="/sign-up">
						<div className="mr-4 text-lg">
							<Button type="link">Log In</Button>
						</div>
					</Link> */}
					<Link href="/sign-up">
						<Button color="primary">Sign Up</Button>
					</Link>
				</nav>
			</header>
		</Container>
	);
}
