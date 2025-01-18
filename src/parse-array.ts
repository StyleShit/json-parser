import { createParser } from './create-parser';
import { parseAST } from './parse-ast';
import { skipWhitespaces } from './skip-whitespaces';
import type { AST } from './types';

export type JSONArray = {
	kind: 'array';
	members: AST[];
};

export const parseArray = createParser<JSONArray>((json, index) => {
	if (json[index] !== '[') {
		return null;
	}

	index = skipWhitespaces(json, index + 1);

	const members: AST[] = [];

	while (index < json.length) {
		if (json[index] === ']') {
			return {
				nextIndex: index + 1,
				value: {
					kind: 'array',
					members,
				},
			};
		}

		const { value: parsed, nextIndex } = parseAST(json, index);

		if (!parsed) {
			throw new Error(
				`Unexpected '${json[nextIndex]}' at index ${String(nextIndex)}`,
			);
		}

		members.push(parsed);

		index = nextIndex;

		if (json[index] === ',') {
			index++;
		}
	}

	return null;
});
