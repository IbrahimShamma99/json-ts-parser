import { Scanner, Parser } from '../../src'

describe('JSON Scanner Tests', () => {
  it('should parse a empty object', () => {
    const source = '{}'
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    expect(parser.tree.variant).toBe('object')
    expect(parser.tree.exprs.length).toBe(0)
  })

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

  it('should parse Inner objects', () => {
    const sourceObject =
      '{"name": "John Doe", "figure": {"label": "Figure", "enabled": false}, "approvalManager": "John Doe 2" }'
    const scanner = new Scanner(sourceObject)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    expect(parser.tree.variant).toBe('object')
    expect(parser.tree.exprs.length).toBe(3)
  })

  it('should parse Array of numbers', () => {
    const source = `[
      5 , 4 , 8
    ]`
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    expect(parser.tree.variant).toBe('array')
    expect(parser.tree.exprs.length).toBe(3)
  })

  it('should parse Array of numbers and strings', () => {
    const source = `[
      5 , "username"
    ]`
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    expect(parser.tree.variant).toBe('array')
    expect(parser.tree.exprs.length).toBe(2)
  })

  it('should parse Array of numbers, strings & objects', () => {
    const source = `[
      5 , "username" , {}
    ]`
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    expect(parser.tree.variant).toBe('array')
    expect(parser.tree.exprs.length).toBe(3)
  })
})
