import { parseArray } from './parsers/parse-array';
import { parseBoolean } from './parsers/parse-boolean';
import { parseNull } from './parsers/parse-null';
import { parseNumber } from './parsers/parse-number';
import { parseObject } from './parsers/parse-object';
import { parseString } from './parsers/parse-string';
import type { NormalizedParser } from './types';

const parsers = [
	parseNull,
	parseBoolean,
	parseNumber,
	parseString,
	parseArray,
	parseObject,
] satisfies NormalizedParser[];

export function parseAST(json: string, index: number) {
	let result: ReturnType<NormalizedParser> = {
		value: null,
		nextIndex: index,
	};

	for (const parser of parsers) {
		result = parser(json, index);

		if (result.value) {
			return result;
		}
	}

	return result;
}
