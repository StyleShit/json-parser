import { createParser } from '../create-parser';
import { parseAST } from '../parse-ast';
import { parseString } from './parse-string';
import { skipWhitespaces } from '../skip-whitespaces';
import type { AST, JSONObject } from '../types';
import { UnexpectedTokenError } from '../errors/unexpected-token-error';
import { DuplicateKeyError } from '../errors/duplicate-key-error';

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
			throw new UnexpectedTokenError(json, parsedKey.nextIndex);
		}

		const memberKey = parsedKey.value.value;

		if (memberKey in members) {
			const keyIndex = parsedKey.nextIndex - memberKey.length - 2;

			throw new DuplicateKeyError(memberKey, keyIndex);
		}

		if (json[parsedKey.nextIndex] !== ':') {
			throw new UnexpectedTokenError(json, parsedKey.nextIndex);
		}

		const parsedValue = parseAST(json, parsedKey.nextIndex + 1);

		if (!parsedValue.value) {
			throw new UnexpectedTokenError(json, parsedValue.nextIndex);
		}

		members[memberKey] = parsedValue.value;

		index = parsedValue.nextIndex;

		if (json[index] === '}') {
			continue;
		}

		if (json[index] !== ',') {
			throw new UnexpectedTokenError(json, index);
		}

		index++;
	}

	return null;
});
