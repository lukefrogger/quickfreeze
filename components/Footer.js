import Image from "next/image";
import Link from "next/link";
import Container from "../atoms/container";
import icon from "../public/logo_big_trans.png";

export default function Footer() {
	return (
		<footer className="bg-bLight text-white py-12">
			<Container padding="px-4">
				<div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="flex items-center">
						<div className="flex items-center flex-none">
							<Image src={icon} alt="quick freeze logo" height={80} width={80} />
						</div>
						<div className="border h-full mx-4" />
						<div>Quick Freeze is a temporary database-as-a-service that helps you manage temporary data</div>
					</div>
					<div className="hidden lg:block">&nbsp;</div>
					<div className="flex items-center">
						<ul className="pr-8">
							<li>
								<strong>Links</strong>
							</li>
							<li>
								<Link href="/privacy-policy">
									<a className="underline">Privacy Policy</a>
								</Link>
							</li>
							<li>
								<Link href="/terms-of-service" passHref>
									<a className="underline">Terms of Service</a>
								</Link>
							</li>
						</ul>
						<ul>
							<li>
								<strong>Support</strong>
							</li>
							<li>
								<Link href="/docs" passHref>
									<a className="underline">Documentation</a>
								</Link>
							</li>
							<li>
								<p>support@quickfreeze.io</p>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</footer>
	);
}
