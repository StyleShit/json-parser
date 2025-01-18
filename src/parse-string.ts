import type { Parser } from './types';

export type JSONString = {
	kind: 'string';
	value: string;
};

export const parseString: Parser<JSONString> = (json, index) => {
	if (json[index] !== '"') {
		return null;
	}

	let value = '';
	index++;

	while (index < json.length) {
		if (json[index] === '"') {
			return {
				nextIndex: index + 1,
				value: {
					kind: 'string',
					value,
				},
			};
		}

		value += json[index];

		index++;
	}

	return null;
};
