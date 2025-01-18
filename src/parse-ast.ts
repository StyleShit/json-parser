import { parseArray } from './parse-array';
import { parseBoolean } from './parse-boolean';
import { parseNull } from './parse-null';
import { parseNumber } from './parse-number';
import { parseString } from './parse-string';
import { skipWhitespaces } from './skip-whitespaces';

export function parseAST(json: string, index: number) {
	index = skipWhitespaces(json, index);

	const parsed =
		parseNull(json, index) ??
		parseBoolean(json, index) ??
		parseNumber(json, index) ??
		parseString(json, index) ??
		parseArray(json, index);

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
