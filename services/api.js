export const fetcher = async (url, token, method) => {
	try {
		const resp = await fetch(url, {
			method: method,
			headers: new Headers({ "Content-Type": "application/json", token }),
			credentials: "same-origin",
		});

		return await resp.json();
	} catch (err) {
		console.log("API feetch error", err);
	}
};
