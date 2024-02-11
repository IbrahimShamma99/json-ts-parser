import { Scanner, Parser } from '../../src'

describe('JSON Scanner Tests', () => {
  it('should parse a simple JSON', () => {
    const source = '{"name": "John Doe"}'
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    expect(parser.tree.variant).toBe('object')
    expect(parser.tree.exprs.length).toBe(1)
  })

  it('should parse a simple JSON with multiple bnries', () => {
    const source =
      '{"name": "John Doe", "age": 16, "isStudent": true , "gradDate": null}'
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    expect(parser.tree.variant).toBe('object')
    expect(parser.tree.exprs.length).toBe(4)
  })
})
