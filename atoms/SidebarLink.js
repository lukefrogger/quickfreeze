import Link from "next/link";
import { useEffect, useState } from "react";

export default function SidebarLink({ children, href, newTab }) {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (href === window.location.pathname) {
			setIsActive(true);
		}
	}, []);

	return (
		<div className={`pt-1 pb-1 pr-4 pl-4 ${isActive ? "bg-primary" : "bg-transparent"}`}>
			<Link href={href} passHref>
				<a className="line-clamp-1" target={newTab ? "_target" : ""}>
					{children}
				</a>
			</Link>
		</div>
	);
}
