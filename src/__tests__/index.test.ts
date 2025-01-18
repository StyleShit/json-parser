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

	it('should parse empty arrays', () => {
		// Act.
		const parsed = parse('[]');
		const parsedWithWhitespaces = parse('[ \t \n \r ]');

		// Assert.
		expect(parsed).toStrictEqual({
			kind: 'array',
			members: [],
		});

		expect(parsedWithWhitespaces).toStrictEqual({
			kind: 'array',
			members: [],
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

	it('should parse objects', () => {
		// Act.
		const parsed = parse(
			'{"key": 123, "key2": "string", "key3": null, "key4": { "key": true }}',
		);

		// Assert.
		expect(parsed).toStrictEqual({
			kind: 'object',
			members: {
				key: { kind: 'number', value: 123 },
				key2: { kind: 'string', value: 'string' },
				key3: { kind: 'null' },
				key4: {
					kind: 'object',
					members: {
						key: { kind: 'boolean', value: true },
					},
				},
			},
		});
	});

	it('should parse empty objects', () => {
		// Act.
		const parsed = parse('{}');
		const parsedWithWhitespaces = parse('{ \t \n \r }');

		// Assert.
		expect(parsed).toStrictEqual({
			kind: 'object',
			members: {},
		});

		expect(parsedWithWhitespaces).toStrictEqual({
			kind: 'object',
			members: {},
		});
	});

	it('should parse objects with whitespaces', () => {
		// Act.
		const parsed = parse(
			'  {  \n "key"  \t : \n 123  ,  "key2"  \n :  \r "string"  ,   "key3"   :  null   }  ',
		);

		// Assert.
		expect(parsed).toStrictEqual({
			kind: 'object',
			members: {
				key: { kind: 'number', value: 123 },
				key2: { kind: 'string', value: 'string' },
				key3: { kind: 'null' },
			},
		});
	});

	it('should allow a single trailing comma in objects', () => {
		// Act.
		const parsed = parse('{"key": 123, "key2": "string",}');

		// Assert.
		expect(parsed).toStrictEqual({
			kind: 'object',
			members: {
				key: { kind: 'number', value: 123 },
				key2: { kind: 'string', value: 'string' },
			},
		});

		// Act & Assert.
		expect(() => parse('{"key": 123, "key2": "string", ,}')).toThrowError(
			"Unexpected ',' at index 31",
		);
	});

	it('should throw for objects without commas', () => {
		// Act & Assert.
		expect(() => parse('{"key": 123 "key-2": 456}')).toThrowError(
			`Unexpected '"' at index 12`,
		);
	});

	it('should throw for duplicate object keys', () => {
		// Act & Assert.
		expect(() => parse('{"key": 123, "key": 456}')).toThrowError(
			"Duplicate key 'key' at index 13",
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
