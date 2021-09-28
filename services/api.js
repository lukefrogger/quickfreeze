export const fetcher = async (url, token, method, body = {}) => {
	try {
		const resp = await fetch(url, {
			method: method,
			headers: new Headers({ "Content-Type": "application/json", token }),
			credentials: "same-origin",
			body: JSON.stringify(body),
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
