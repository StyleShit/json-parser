import { createParser } from '../create-parser';
import type { JSONString } from '../types';

export const parseString = createParser<JSONString>((json, index) => {
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
});
