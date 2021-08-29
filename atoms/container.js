export default function Container({ children, padding = "" }) {
	return <div className={`container mx-auto max-w-screen-xl px-4`}>{children}</div>;
}
