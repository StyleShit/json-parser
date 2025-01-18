import { UnexpectedEndOfInputError } from './errors/unexpected-end-of-input-error';
import { UnexpectedTokenError } from './errors/unexpected-token-error';
import { parseAST } from './parse-ast';

export function parse(json: string) {
	if (json.trim().length === 0) {
		throw new UnexpectedEndOfInputError();
	}

	const { nextIndex, value: parsed } = parseAST(json, 0);
	const isEndOfInput = nextIndex === json.length;

	if (!parsed || !isEndOfInput) {
		throw new UnexpectedTokenError(json, nextIndex);
	}

	return parsed;
}
