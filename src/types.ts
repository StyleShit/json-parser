import type { JSONArray } from './parse-array';
import type { JSONBoolean } from './parse-boolean';
import type { JSONNull } from './parse-null';
import type { JSONNumber } from './parse-number';
import type { JSONString } from './parse-string';

export type AST = JSONNull | JSONBoolean | JSONArray | JSONNumber | JSONString;

export type Parser<T extends ASTNode> = (
	json: string,
	index: number,
) => Parsed<T> | null;

export type Parsed<T extends ASTNode> = {
	nextIndex: number;
	value: T;
};

export type ASTNode = {
	kind: string;
};
