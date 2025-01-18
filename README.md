# JSON Parser

Simple JSON to AST parser in TypeScript.

This parser has a custom grammar and exists for learning purposes.

## Features

The parser supports the following JSON types:

- `null`
- `boolean`
- `number`
- `string`
- `array`
- `object`

In addition, it supports trailing commas in arrays and objects (for god's sake!).

## Installation

```bash
npm install @styleshit/json-parser
```

## Usage

To use it, import the `parse` function and pass a JSON string to it.

For example, this code:

```typescript
import { parse } from '@styleshit/json-parser';

const ast = parse('{"hello": "world", "foo": 42,}');

console.log(ast);
```

Will output:

```typescript
{
  kind: 'object',
  members: {
    hello: {
      kind: 'string',
      value: 'world',
    },
    foo: {
      kind: 'number',
      value: 42,
    },
  },
}
```

While this code will throw an error:

```typescript
import { parse } from '@styleshit/json-parser';

const ast = parse('{"hello": "world", "foo": 42} true');

// SyntaxError: Unexpected 't' at index 30
```
