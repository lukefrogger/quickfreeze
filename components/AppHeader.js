import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Container from "../atoms/Container";
import icon from "../public/logo_white.png";
import { supabase } from "../services/supabase";

export default function AppHeader() {
	const [navToggle, setNavToggle] = useState(true);
	const router = useRouter();

	const signOut = () => {
		console.log("signOut");
		const { error } = supabase.auth.signOut();
		router.replace("/");
	};

	return (
		<header>
			<nav className="flex items-center justify-between flex-wrap w-full bg-primary relative">
				<Container>
					<nav className="flex items-center justify-between flex-wrap p-4">
						<div className="flex items-center flex-shrink-0 text-white mr-6 z-30">
							<a className="text-white no-underline hover:text-white hover:no-underline" href="/app">
								<div className="flex items-center cursor-pointer">
									<Image src={icon} alt="quick freeze logo" height={30} width={40} />
									{/* <div className="text-2xl text-gray-200 ml-4">Quick Freeze</div> */}
								</div>
							</a>
							<ul className="list-reset flex ml-6 items-center">
								<li className="mr-3">
									<a
										className="inline-block no-underline hover:text-underline py-2 px-4"
										href="/app/trays"
										target="_blank"
									>
										Trays
									</a>
								</li>
								<li className="mr-3">
									<a className="inline-block no-underline hover:text-underline py-2 px-4" href="/app/account">
										Account
									</a>
								</li>
							</ul>
						</div>

						<div className="block lg:hidden z-30">
							<button
								id="nav-toggle"
								className="flex items-center px-3 py-3 text-white bg-pDark rounded-full"
								onClick={() => setNavToggle(!navToggle)}
							>
								<svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
									<title>Menu</title>
									<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
								</svg>
							</button>
						</div>

						<div
							className={`w-full flex-grow absolute lg:top-4 lg:visible bg-primary right-0 lg:flex lg:items-center lg:w-auto  ${
								navToggle ? "-top-60 invisible" : "top-16 visible"
							} lg:block transition-all lg:border-0 border-b pl-4 pb-4 lg:pb-0 lg:pl-0 pt-6 lg:pt-0 z-10 lg:z-20`}
						>
							<ul className="list-reset lg:flex justify-end flex-1 items-center text-center lg:text-left">
								{/* <li className="mr-3 lg:hidden border-b">
									<a
										className="inline-block no-underline hover:text-underline py-2 px-4"
										href="/app/trays"
										target="_blank"
									>
										Trays
									</a>
								</li>
								<li className="mr-3 lg:hidden border-b">
									<a className="inline-block no-underline hover:text-underline py-2 px-4" href="/app/account">
										Account
									</a>
								</li> */}
								<li className="mr-3 border-b lg:border-0">
									<a className="inline-block no-underline hover:text-underline py-2 px-4" href="/docs" target="_blank">
										Docs
									</a>
								</li>
								<li className="mr-3 border-b lg:border-0">
									<a className="inline-block no-underline hover:text-underline py-2 px-4" href="/app/docs">
										Contact Us
									</a>
								</li>
								<li className="mr-3">
									<div className="inline-block  no-underline hover:text-underline py-2 px-4" onClick={signOut}>
										Log Out
									</div>
								</li>
							</ul>
						</div>
					</nav>
				</Container>
			</nav>
		</header>
	);
}
