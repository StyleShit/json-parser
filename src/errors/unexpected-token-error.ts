export class UnexpectedTokenError extends Error {
	constructor(json: string, index: number) {
		super(`Unexpected '${json[index]}' at index ${String(index)}`);
	}
}
