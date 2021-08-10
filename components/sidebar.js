import Image from "next/image";
import icon from "../public/logo_trans.png";
import Link from "next/link";
import SidebarLink from "../atoms/sidebarLink";

export default function Sidebar() {
	return (
		<div className="w-60 bg-gray-700 h-screen">
			<div className="p-4 flex items-center">
				<Image src={icon} alt="quick freeze pixel logo" width={40} height={40} />
				<div className="ml-2 text-xl text-primary">Quick Freeze</div>
			</div>
			<nav>
				<ul className="mb-6">
					<li className="mb-1 pl-4">
						<header className="font-extrabold text-gray-400">BUCKETS</header>
					</li>
					<li>
						<SidebarLink href="/buckets">All Buckets</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/recent1">Order-sync</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/recent2">Salesforce migration 1</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/recent3">Fetch forms temp db adfa adf asd asd </SidebarLink>
					</li>
				</ul>
				<ul className="mb-6">
					<li className="mb-1 pl-4">
						<header className="font-extrabold text-gray-400">ACCOUNT</header>
					</li>
					<li>
						<SidebarLink href="/personal">Personal</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/api-keys">API Keys</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/billing">Billing</SidebarLink>
					</li>
				</ul>
				<ul className="mb-6">
					<li className="mb-1 pl-4">
						<header className="font-extrabold text-gray-400">EXTRAS</header>
					</li>
					<li>
						<SidebarLink href="/docs">Documentation</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/feedback">Feedback</SidebarLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}
