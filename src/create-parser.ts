import { skipWhitespaces } from './skip-whitespaces';
import type { AST, NormalizedParser, Parser } from './types';

export function createParser<T extends AST>(
	parser: Parser<T>,
): NormalizedParser<T> {
	return (json, index) => {
		index = skipWhitespaces(json, index);

		const parsed = parser(json, index);

		if (!parsed) {
			return {
				nextIndex: index,
				value: null,
			};
		}

		index = skipWhitespaces(json, parsed.nextIndex);

		return {
			nextIndex: index,
			value: parsed.value,
		};
	};
}
