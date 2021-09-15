export const fetcher = async (url, token, method) => {
	try {
		const resp = await fetch(url, {
			method: method,
			headers: new Headers({ "Content-Type": "application/json", token }),
			credentials: "same-origin",
		});

		const data = await resp.json();
		if (data.error) {
			throw data.error;
		}
		return data;
	} catch (err) {
		console.log("API feetch error", err);
		throw err;
	}
};
