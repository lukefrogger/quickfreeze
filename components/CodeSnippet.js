import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function CodeSnippet({ code, title }) {
	return (
		<div className="rounded-md border border-primary text-sm bg-primary flex flex-col">
			<div className="flex justify-between p-2 ">
				<div className="ml-2 text-darkPrimary">{title}</div>
			</div>
			<SyntaxHighlighter language="javascript" wrapLongLines={true} style={agate} className="rounded-bl-md rounded-br-md h-full">
				{code}
			</SyntaxHighlighter>
		</div>
	);
}
