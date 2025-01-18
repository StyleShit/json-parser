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

	it('should parse numbers', () => {
		// Act.
		const parsed = parse('123');

		// Assert.
		expect(parsed).toStrictEqual({ kind: 'number', value: 123 });
	});

	it('should parse strings', () => {
		// Act.
		const parsed = parse('"string \t with \r \n whitespaces"');

		// Assert.
		expect(parsed).toStrictEqual({
			kind: 'string',
			value: 'string \t with \r \n whitespaces',
		});
	});

	it('should parse arrays', () => {
		// Act.
		const parsed = parse('[123, "string", null, true, false, [1]]');

		// Assert.
		expect(parsed).toStrictEqual({
			kind: 'array',
			members: [
				{ kind: 'number', value: 123 },
				{ kind: 'string', value: 'string' },
				{ kind: 'null' },
				{ kind: 'boolean', value: true },
				{ kind: 'boolean', value: false },
				{
					kind: 'array',
					members: [{ kind: 'number', value: 1 }],
				},
			],
		});
	});

	it('should allow a single trailing comma in arrays', () => {
		// Act.
		const parsed = parse('[123, "string",]');

		// Assert.
		expect(parsed).toStrictEqual({
			kind: 'array',
			members: [
				{ kind: 'number', value: 123 },
				{ kind: 'string', value: 'string' },
			],
		});

		// Assert.
		expect(() => parse('[123, "string", ,]')).toThrowError(
			"Unexpected ',' at index 16",
		);
	});

	it('should ignore whitespaces', () => {
		// Act.
		const parsedNull = parse('  \r \n \t null  \r \n \t ');

		const parsedArray = parse(
			'  \r \n \t [  \r \n \t 123  ,  true \r \n \t ]  \r \n \t ',
		);

		// Assert.
		expect(parsedNull).toStrictEqual({ kind: 'null' });

		expect(parsedArray).toStrictEqual({
			kind: 'array',
			members: [
				{ kind: 'number', value: 123 },
				{ kind: 'boolean', value: true },
			],
		});
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
