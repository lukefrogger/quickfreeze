import Image from "next/image";
import icon from "../public/logo_trans.png";
import SidebarLink from "../atoms/SidebarLink";
import SmallHeader from "../atoms/SmallHeader";

export default function Sidebar({ topThree }) {
	return (
		<div className="w-60 bg-bLight h-screen">
			<div className="p-4 flex items-center">
				<Image src={icon} alt="quick freeze pixel logo" width={40} height={40} />
				<div className="ml-2 text-xl text-primary">Quick Freeze</div>
			</div>
			<nav>
				<ul className="mb-6 mt-4">
					<li className="mb-1 pl-4">
						<SmallHeader>trays</SmallHeader>
					</li>
					<li>
						<SidebarLink href="/trays">All Trays</SidebarLink>
					</li>
					{topThree.map((tray, i) => (
						<li key={`traylink${i}`}>
							<SidebarLink href={tray.link}>{tray.name}</SidebarLink>
						</li>
					))}
				</ul>
				<ul className="mb-6">
					<li className="mb-1 pl-4">
						<SmallHeader>account</SmallHeader>
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
						<SmallHeader>extras</SmallHeader>
					</li>
					<li>
						<SidebarLink href="/docs" newTab={true}>
							Documentation
						</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/feedback" newTab={true}>
							Feedback
						</SidebarLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}
