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
