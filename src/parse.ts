import { parseNull } from './parse-null';

export function parse(json: string) {
	const parsed = parseNull(json, 0);

	if (!parsed) {
		throw new Error(`Unexpected '${String(json[0])}' at index 0`);
	}

	return parsed.value;
}
