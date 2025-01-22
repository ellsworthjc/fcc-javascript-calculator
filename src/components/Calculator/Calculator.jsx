import { useCalculator } from "./useCalculator";
import { Button } from "../Button";

export function Calculator({ debug = false }) {
	const {
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
	} = useCalculator();

	return (
		<div className="flex items-center gap-24 p-6 rounded-3xl border-4 border-solid border-slate-600">
			{debug && (
				<div>
					<p>Display: {display}</p>
					<p>Operator: {operator}</p>
					<p>Operand 1: {operand1}</p>
					<p>Operand 2: {operand2}</p>
					<p>Active Operand: {activeOperand}</p>
					<p>Total: {total}</p>
				</div>
			)}
			<div className="flex flex-col gap-2">
				<h1 id="display" className="text-5xl">
					{display}
				</h1>
				<div className="grid grid-cols-3 gap-2">
					{[
						["seven", 7],
						["eight", 8],
						["nine", 9],
						["four", 4],
						["five", 5],
						["six", 6],
						["three", 3],
						["two", 2],
						["one", 1],
						["zero", 0],
					].map(([name, number]) => (
						<Button
							id={name}
							key={name}
							text={`${number}`}
							onClick={() => {
								handleNumberClick(number.toString());
							}}
						/>
					))}
					<Button
						id="decimal"
						text="."
						onClick={() => handleDecimalClick(".")}
					/>
					<Button id="clear" text="Clear" onClick={handleClearClick} />
				</div>
				<div className="grid grid-cols-4 gap-2">
					<Button
						id="divide"
						text="÷"
						onClick={() => handleOperatorClick("divide")}
					/>
					<Button
						id="multiply"
						text="✕"
						onClick={() => handleOperatorClick("multiply")}
					/>
					<Button
						id="subtract"
						text="-"
						onClick={() => handleOperatorClick("subtract")}
					/>
					<Button
						id="add"
						text="+"
						onClick={() => handleOperatorClick("add")}
					/>
				</div>
				<Button id="equals" text="=" onClick={handleEqualsClick} />
			</div>
		</div>
	);
}
