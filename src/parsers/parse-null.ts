import { createParser } from '../create-parser';

export type JSONNull = {
	kind: 'null';
};

export const parseNull = createParser<JSONNull>((json, index) => {
	if (json.slice(index, index + 4) === 'null') {
		return {
			nextIndex: index + 4,
			value: {
				kind: 'null',
			},
		};
	}

	return null;
});
