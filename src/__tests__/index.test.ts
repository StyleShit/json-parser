import { describe, expect, it } from 'vitest';
import { parse } from '../index';

describe('JSON Parser', () => {
	it('should parse null', () => {
		// Act.
		const parsed = parse('null');

		// Assert.
		expect(parsed).toStrictEqual({ kind: 'null' });
	});

	it('should parse booleans', () => {
		// Act.
		const parsedTrue = parse('true');
		const parsedFalse = parse('false');

		// Assert.
		expect(parsedTrue).toStrictEqual({ kind: 'boolean', value: true });
		expect(parsedFalse).toStrictEqual({ kind: 'boolean', value: false });
	});

	it('should ignore whitespaces', () => {
		// Act.
		const parsed = parse('  \r \n \t null  \r \n \t ');

		// Assert.
		expect(parsed).toStrictEqual({ kind: 'null' });
	});

	it('should throw when parsing empty input', () => {
		// Assert.
		expect(() => parse('  \r \n \t ')).toThrowError(
			'Unexpected end of input',
		);
	});

	it('should throw when parsing unexpected input', () => {
		// Assert.
		expect(() => parse('invalid-json')).toThrowError(
			"Unexpected 'i' at index 0",
		);

		expect(() => parse('null true')).toThrowError(
			"Unexpected 't' at index 5",
		);
	});
});
