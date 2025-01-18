import { createParser } from '../create-parser';
import type { JSONBoolean } from '../types';

export const parseBoolean = createParser<JSONBoolean>((json, index) => {
	if (json.slice(index, index + 4) === 'true') {
		return {
			nextIndex: index + 4,
			value: {
				kind: 'boolean',
				value: true,
			},
		};
	}

	if (json.slice(index, index + 5) === 'false') {
		return {
			nextIndex: index + 5,
			value: {
				kind: 'boolean',
				value: false,
			},
		};
	}

	return null;
});
