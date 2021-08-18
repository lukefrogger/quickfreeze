import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function CodeSnippet({ code }) {
	return (
		<div className="rounded-md border border-primary text-sm">
			<div className="flex justify-between p-2 rounded-tl-md rounded-tr-md bg-primary">
				javascript
				<div>
					<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
						<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
					</svg>
				</div>
			</div>
			<SyntaxHighlighter language="javascript" wrapLongLines={true} style={agate} className="rounded-bl-md rounded-br-md">
				{code}
			</SyntaxHighlighter>
		</div>
	);
}
