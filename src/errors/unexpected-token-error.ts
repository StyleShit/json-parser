export class UnexpectedTokenError extends SyntaxError {
	constructor(json: string, index: number) {
		super(`Unexpected '${json[index]}' at index ${String(index)}`);
	}
}
