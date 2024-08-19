export default function urlValidator (value: string) {
	if (value && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value)) {
		throw new Error("You must provide a valid URL.");
	}
}
