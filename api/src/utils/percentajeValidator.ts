export function validatePercentage(
	value: number,
	min: number,
	max: number,
	fieldName: string
) {
	if (value < min) {
		throw new Error(`${fieldName} should be greater than or equal to ${min}.`);
	} else if (value > max) {
		throw new Error(`${fieldName} should be less than or equal to ${max}.`);
	}
}
