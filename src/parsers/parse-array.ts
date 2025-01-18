import { createParser } from '../create-parser';
import { UnexpectedTokenError } from '../errors/unexpected-token-error';
import { parseAST } from '../parse-ast';
import { skipWhitespaces } from '../skip-whitespaces';
import type { AST, JSONArray } from '../types';

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
			throw new UnexpectedTokenError(json, nextIndex);
		}

		members.push(parsed);

		index = nextIndex;

		if (json[index] === ']') {
			continue;
		}

		if (json[index] !== ',') {
			throw new UnexpectedTokenError(json, index);
		}

		index++;
	}

	return null;
});
