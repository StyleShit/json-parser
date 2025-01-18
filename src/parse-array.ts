import { parseAST } from './parse-ast';
import type { AST, Parser } from './types';

export type JSONArray = {
	kind: 'array';
	members: AST[];
};

export const parseArray: Parser<JSONArray> = (json, index) => {
	if (json[index] !== '[') {
		return null;
	}

	index++;

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

		const { parsed, nextIndex } = parseAST(json, index);

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
};
