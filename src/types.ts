export type AST =
	| JSONNull
	| JSONBoolean
	| JSONNumber
	| JSONString
	| JSONArray
	| JSONObject;

export type JSONNull = {
	kind: 'null';
};

export type JSONBoolean = {
	kind: 'boolean';
	value: boolean;
};

export type JSONNumber = {
	kind: 'number';
	value: number;
};

export type JSONString = {
	kind: 'string';
	value: string;
};

export type JSONArray = {
	kind: 'array';
	members: AST[];
};

export type JSONObject = {
	kind: 'object';
	members: Record<string, AST>;
};

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
