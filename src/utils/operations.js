export function evaluate(a, b, operation) {
	console.log("Evaluating...", { a, b, operation });
	a = parseFloat(a);
	b = parseFloat(b);
	let result = null;
	switch (operation) {
		case "add":
			result = a + b;
			break;
		case "subtract":
			result = a - b;
			break;
		case "divide":
			result = a / b;
			break;
		case "multiply":
			result = a * b;
			break;
		default:
			break;
	}
	console.log("Evaluated:", result);
	return result;
}

export function makeNegative(a) {
	return "-" + a;
}
