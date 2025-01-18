export class DuplicateKeyError extends SyntaxError {
	constructor(key: string, index: number) {
		super(`Duplicate key '${key}' at index ${String(index)}`);
	}
}
