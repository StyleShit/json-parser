import { parseBoolean } from './parse-boolean';
import { parseNull } from './parse-null';
import { parseNumber } from './parse-number';
import { parseString } from './parse-string';
import { skipWhitespaces } from './skip-whitespaces';

export function parse(json: string) {
	if (json.trim().length === 0) {
		throw new Error('Unexpected end of input');
	}

	const { nextIndex: index, parsed } = parseAST(json, 0);

	if (!parsed) {
		throw new Error(
			`Unexpected '${json[index]}' at index ${String(index)}`,
		);
	}

	if (index !== json.length) {
		throw new Error(
			`Unexpected '${json[index]}' at index ${String(index)}`,
		);
	}

	return parsed;
}

function parseAST(json: string, index: number) {
	index = skipWhitespaces(json, index);

	const parsed =
		parseNull(json, index) ??
		parseBoolean(json, index) ??
		parseNumber(json, index) ??
		parseString(json, index);

	if (!parsed) {
		return {
			nextIndex: index,
			parsed: null,
		};
	}

	index = skipWhitespaces(json, parsed.nextIndex);

	return {
		nextIndex: index,
		parsed: parsed.value,
	};
}
