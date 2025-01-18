export class DuplicateKeyError extends Error {
	constructor(key: string, index: number) {
		super(`Duplicate key '${key}' at index ${String(index)}`);
	}
}
