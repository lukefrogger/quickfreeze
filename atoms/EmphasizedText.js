export default function EmphasizedText({ children, weight }) {
	return <span className={`${weight === "normal" ? "font-normal" : "font-bold"} text-primary`}>{children}</span>;
}
