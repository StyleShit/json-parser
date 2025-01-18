import { parseNull } from './parse-null';
import { skipWhitespaces } from './skip-whitespaces';

export function parse(json: string) {
	if (json.length === 0) {
		throw new Error('Unexpected end of input');
	}

	let index = skipWhitespaces(json, 0);
	const parsed = parseNull(json, index);

	if (!parsed) {
		throw new Error(
			`Unexpected '${json[index]}' at index ${String(index)}`,
		);
	}

	index = skipWhitespaces(json, parsed.nextIndex);

	if (index !== json.length) {
		throw new Error(
			`Unexpected '${json[index]}' at index ${String(index)}`,
		);
	}

	return parsed.value;
}
