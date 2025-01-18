import type { Parser } from './types';

export type JSONNumber = {
	kind: 'number';
	value: number;
};

export const parseNumber: Parser<JSONNumber> = (json, index) => {
	const isNumber = (index: number) => /\d/.test(json[index]);

	if (!isNumber(index)) {
		return null;
	}

	let value = '';

	while (isNumber(index)) {
		value += json[index];

		index++;
	}

	return {
		nextIndex: index,
		value: {
			kind: 'number',
			value: Number(value),
		},
	};
};
