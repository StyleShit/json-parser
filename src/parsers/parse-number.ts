import { createParser } from '../create-parser';
import type { JSONNumber } from '../types';

export const parseNumber = createParser<JSONNumber>((json, index) => {
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
});
