export default function EmphasizedText({ children, weight }) {
	return <span className={`font-${weight === "normal" ? "normal" : "bold"} text-primary`}>{children}</span>;
}
