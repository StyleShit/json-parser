import { describe, expect, it } from 'vitest';
import { parse } from '../index';

describe('JSON Parser', () => {
	it('should parse null', () => {
		// Act.
		const parsed = parse('null');

		// Assert.
		expect(parsed).toStrictEqual({ kind: 'null' });
	});

	it('should ignore whitespaces', () => {
		// Act.
		const parsed = parse('  \r \n \t null  \r \n \t ');

		// Assert.
		expect(parsed).toStrictEqual({ kind: 'null' });
	});

	it('should throw when parsing unexpected input', () => {
		// Assert.
		expect(() => parse('invalid-json')).toThrowError(
			"Unexpected 'i' at index 0",
		);

		expect(() => parse('null a')).toThrowError("Unexpected 'a' at index 5");
	});
});
