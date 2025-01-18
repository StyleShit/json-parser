import { createParser } from './create-parser';
import { parseAST } from './parse-ast';
import { parseString } from './parse-string';
import { skipWhitespaces } from './skip-whitespaces';
import type { AST } from './types';

export type JSONObject = {
	kind: 'object';
	members: Record<string, AST>;
};

export const parseObject = createParser<JSONObject>((json, index) => {
	if (json[index] !== '{') {
		return null;
	}

	index = skipWhitespaces(json, index + 1);

	const members: Record<string, AST> = {};

	while (index < json.length) {
		if (json[index] === '}') {
			return {
				nextIndex: index + 1,
				value: {
					kind: 'object',
					members,
				},
			};
		}

		const parsedKey = parseString(json, index);

		if (!parsedKey.value) {
			throw new Error(
				`Unexpected '${json[parsedKey.nextIndex]}' at index ${String(parsedKey.nextIndex)}`,
			);
		}

		const memberKey = parsedKey.value.value;

		if (memberKey in members) {
			const keyIndex = parsedKey.nextIndex - memberKey.length - 2;

			throw new Error(
				`Duplicate key '${memberKey}' at index ${String(keyIndex)}`,
			);
		}

		if (json[parsedKey.nextIndex] !== ':') {
			throw new Error(
				`Unexpected '${json[parsedKey.nextIndex]}' at index ${String(parsedKey.nextIndex)}`,
			);
		}

		const parsedValue = parseAST(json, parsedKey.nextIndex + 1);

		if (!parsedValue.value) {
			throw new Error(
				`Unexpected '${json[parsedValue.nextIndex]}' at index ${String(parsedValue.nextIndex)}`,
			);
		}

		members[memberKey] = parsedValue.value;

		index = parsedValue.nextIndex;

		if (json[index] === '}') {
			continue;
		}

		if (json[index] !== ',') {
			throw new Error(
				`Unexpected '${json[index]}' at index ${String(index)}`,
			);
		}

		index++;
	}

	return null;
});
