export default function parseStripeDate(nonDateThing) {
	return new Date(nonDateThing * 1000);
}
