import type { JSONArray } from './parsers/parse-array';
import type { JSONBoolean } from './parsers/parse-boolean';
import type { JSONNull } from './parsers/parse-null';
import type { JSONNumber } from './parsers/parse-number';
import type { JSONObject } from './parsers/parse-object';
import type { JSONString } from './parsers/parse-string';

export type AST =
	| JSONNull
	| JSONBoolean
	| JSONNumber
	| JSONString
	| JSONArray
	| JSONObject;

export type Parser<T extends AST> = (
	json: string,
	index: number,
) => Parsed<T> | null;

export type Parsed<T extends AST | null> = {
	nextIndex: number;
	value: T;
};

export type NormalizedParser<T extends AST = AST> = (
	json: string,
	index: number,
) => Parsed<T | null>;
