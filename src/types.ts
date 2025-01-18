import type { JSONArray } from './parse-array';
import type { JSONBoolean } from './parse-boolean';
import type { JSONNull } from './parse-null';
import type { JSONNumber } from './parse-number';
import type { JSONObject } from './parse-object';
import type { JSONString } from './parse-string';

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
