# JSON Parsing toolchain

## Fun Project still in the creation aims to create type inference from JSON to Typescript interfaces.

Inspired by [TS Service](https://github.com/unlight/typescript-service)

## Usage

Example of usage:

```ts
const source =
  '{"name": "John Doe", "age": 16, "isStudent": true , "gradDate": null}'
const scanner = new Scanner(source)
scanner.scan()
const parser = new Parser(scanner.tokens)
parser.parse()

const type = new TSVisitor().execute(parser.tree)

// type = 'interface {name: string, age: number, isStudent: boolean, gradDate: null}'
```

## TODO

### Typescript Visitor

- [x] Create a scanner
- [x] Create a parser
- [x] Create a visitor
- [x] Accept inner objects
- [x] Scan arrays
- [x] Parse arrays
- [x] Accept Arrays

### JSON Formatter

- [ ] Visitor Setup
