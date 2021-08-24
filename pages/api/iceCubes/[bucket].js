// import { verifyRequest } from "../../../lib/verifyRequest";

export default async (req, res) => {
	try {
		// const { db } = await connectToDatabase();
		// const userId = await verifyRequest(req.headers.authorization, db);
		// if (!userId) {
		// 	res.status(404).send("Unauthorized request");
		// 	return;
		// }

		// if (req.method === "GET") {
		// 	const { endpoint } = req.query;

		// 	const iceCubes = await db.collection("iceCubes").find({ endpoint }).toArray();
		// 	res.json(iceCubes);
		// }
		res.send("nopsies");
	} catch (err) {
		console.log("===> Error", err);
		res.status(500).send("Internal Service Error");
	}
};
