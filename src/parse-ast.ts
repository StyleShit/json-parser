import { parseArray } from './parse-array';
import { parseBoolean } from './parse-boolean';
import { parseNull } from './parse-null';
import { parseNumber } from './parse-number';
import { parseObject } from './parse-object';
import { parseString } from './parse-string';
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
