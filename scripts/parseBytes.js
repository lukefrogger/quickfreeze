export default function parseBytes(bytes) {
	if (bytes === 0 || isNaN(bytes)) {
		return "0 KB";
	}

	const kilo = bytes / 1000;
	if (kilo <= 1000) {
		return Math.round(kilo * 100) / 100 + " KB";
	}

	const mega = kilo / 1000;
	if (mega <= 1000) {
		return Math.round(mega * 100) / 100 + " MB";
	}

	const gig = mega / 1000;
	return Math.round(gig * 100) / 100 + "GB";
}
