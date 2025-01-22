import { useState } from "react";
import { evaluate, makeNegative } from "../../utils/operations";

export function useCalculator() {
	const [display, setDisplay] = useState("0");
	const [operator, setOperator] = useState(""); // active operator
	const [operand1, setOperand1] = useState("0");
	const [operand2, setOperand2] = useState("0");
	const [activeOperand, setActiveOperand] = useState("1"); // operand 1 or 2
	const [operand2Dirty, setOperand2Dirty] = useState(false);
	const [total, setTotal] = useState("0");

	// Derive current operand for following updates
	const [currentOperand, setCurrentOperand] =
		activeOperand === "1" ? [operand1, setOperand1] : [operand2, setOperand2];

	function handleNumberClick(number) {
		// console.log("number clicked", number);

		// We're changing operand2 so it is now dirty
		if (activeOperand === "2" && !operand2Dirty) {
			setOperand2Dirty(true);
		}

		// Don't add multiple zeroes
		if (currentOperand === "0" && number === "0") {
			return;
		}

		// Replace placeholder zero with incoming number
		if (currentOperand === "0") {
			setCurrentOperand(number);
			setDisplay(number);
			return;
		}

		setCurrentOperand(currentOperand + number);
		setDisplay(currentOperand + number);
	}

	function handleDecimalClick() {
		// console.log("decimal clicked");

		// Don't add mutliple decimals
		if (currentOperand.includes(".")) {
			return;
		}

		// We're changing operand2 so it is now dirty
		if (activeOperand === "2" && !operand2Dirty) {
			setOperand2Dirty(true);
		}

		setCurrentOperand(currentOperand + ".");
		setDisplay(currentOperand + ".");
	}

	function handleOperatorClick(operatorNew) {
		// console.log("operator clicked", operator);

		// First time moving to operand2, move on as normal
		if (!operand2Dirty) {
			// Make current operand negative if operator is not already "-" and operatorNew is also "-"
			if (
				activeOperand === "2" &&
				operator !== "subtract" &&
				operatorNew === "subtract"
			) {
				const negative = makeNegative(currentOperand);
				setCurrentOperand(negative.toString());
				setDisplay(negative.toString());
				return;
			}

			setOperator(operatorNew);
			setActiveOperand("2");
			// setOperand2Dirty(true);

			return;
		}

		// If we've visited operand2 before, evaluate, set display, set operand1, clear operand2, then set operator
		const result = evaluate(operand1, operand2, operator);
		setDisplay(result.toString());
		setOperand1(result.toString());
		setOperand2("0");
		setOperator(operatorNew);
		setOperand2Dirty(false);
	}

	function handleEqualsClick() {
		// console.log("equals clicked");

		// Don't operate unless operand2 is dirty
		if (!operand2Dirty) {
			return;
		}

		const result = evaluate(operand1, operand2, operator);
		setDisplay(result.toString());
		setOperand1(result.toString());
		setOperand2("0");
		setActiveOperand("1");
		setOperand2Dirty(false);
	}

	function handleClearClick() {
		setDisplay("0");
		setOperator("");
		setOperand1("0");
		setOperand2("0");
		setActiveOperand("1");
		setOperand2Dirty(false);
		setTotal("0");
		console.log("Cleared");
	}

	// Set Display to appropriate value. May be result if equal is pressed.
	// setDisplay(currentOperand);

	return {
		display,
		operator,
		operand1,
		operand2,
		activeOperand,
		total,
		handleNumberClick,
		handleDecimalClick,
		handleOperatorClick,
		handleEqualsClick,
		handleClearClick,
	};
}
