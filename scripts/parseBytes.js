function parseBytes(bytes, showLabel) {
	if (bytes === 0 || isNaN(bytes)) {
		return "0" + (showLabel ? " KB" : "");
	}

	const kilo = bytes / 1000;
	if (kilo < 1000) {
		return Math.round(kilo * 100) / 100 + (showLabel ? " KB" : "");
	}

	const mega = kilo / 1000;
	if (mega < 1000) {
		return Math.round(mega * 100) / 100 + (showLabel ? " MB" : "");
	}

	const gig = mega / 1000;
	return Math.round(gig * 100) / 100 + (showLabel ? " GB" : "");
}

export function formatBytes(bytes) {
	return parseBytes(bytes);
}

export function formatBytesWithLabel(bytes) {
	return parseBytes(bytes, true);
}
