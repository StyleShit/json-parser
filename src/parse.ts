import { parseAST } from './parse-ast';

export function parse(json: string) {
	if (json.trim().length === 0) {
		throw new Error('Unexpected end of input');
	}

	const { nextIndex: index, value: parsed } = parseAST(json, 0);

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
