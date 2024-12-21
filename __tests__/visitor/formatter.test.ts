import { Scanner, Parser, FormatterVisitor } from '../../src'

describe('JSON Formatting Visitor Tests', () => {
  it('happy flow', () => {
    const source =
      '{"age":16,"name":"John Doe","isStudent":true,"gradDate":null}'

    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    const formattedJSON = new FormatterVisitor().execute(parser.tree)
    expect(formattedJSON).toBe('{ age: 16, name: John Doe, isStudent: true }')
  })
})
