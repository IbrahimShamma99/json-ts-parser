# JSON into Typescript interface Parser

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

- [x] Create a scanner
- [x] Create a parser
- [x] Create a visitor
- [x] Accept inner objects
- [ ] Create a transformer
- [ ] Create a printer
- [ ] Create a CLI
- [ ] Accept Arrays
