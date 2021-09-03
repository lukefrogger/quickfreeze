import Image from "next/image";
import { useState } from "react";
import Button from "@/atoms/Button";
import Container from "@/atoms/Container";
import icon from "../public/logo_trans.png";

export default function HorizontalHeader() {
	const [navToggle, setNavToggle] = useState(true);

	return (
		<Container>
			<nav className="flex items-center justify-between flex-wrap p-6 mb-8 w-full relative">
				<div className="absolute w-full top-0 h-full left-0 bg-bDark z-20 lg:z-10"></div>
				<div className="flex items-center flex-shrink-0 text-white mr-6 z-30">
					<a className="text-white no-underline hover:text-white hover:no-underline" href="/">
						<div className="flex items-center cursor-pointer">
							<Image src={icon} alt="quick freeze logo" height={40} width={40} />

							<div className="text-2xl text-gray-200 ml-4">Quick Freeze</div>
						</div>
					</a>
				</div>

				<div className="block lg:hidden z-30">
					<button
						id="nav-toggle"
						className="flex items-center px-3 py-3 text-primary bg-gray-700 rounded-full"
						onClick={() => setNavToggle(!navToggle)}
					>
						<svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
							<title>Menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
					</button>
				</div>

				<div
					className={`w-full flex-grow absolute lg:top-4 lg:visible bg-bDark right-0 lg:flex lg:items-center lg:w-auto  ${
						navToggle ? "-top-60 invisible" : "top-16 visible"
					} lg:block transition-all lg:border-0 border-b pl-4 pb-4 lg:pb-0 lg:pl-0 pt-6 lg:pt-0 z-10 lg:z-20`}
				>
					<ul className="list-reset lg:flex justify-end flex-1 items-center">
						<li className="mr-3">
							<a
								className="inline-block text-gray-500 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
								href="/pricing"
							>
								Pricing
							</a>
						</li>
						<li className="mr-3">
							<a
								className="inline-block text-gray-500 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
								href="/docs"
							>
								Docs
							</a>
						</li>
						<li className="mr-3">
							<a
								className="inline-block text-gray-500 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
								href="/login"
							>
								Login
							</a>
						</li>
						<li className="mr-3">
							<a
								className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
								href="/sign-up"
							>
								<Button color="primary">Sign Up</Button>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</Container>
	);
}
