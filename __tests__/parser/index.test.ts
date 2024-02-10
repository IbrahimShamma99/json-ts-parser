import { Scanner, Parser } from '../../src'

describe('JSON Scanner Tests', () => {
  it('should parse a simple Empty JSON', () => {
    const source = `[{}]`

    const scanner = new Scanner(source)
    scanner.scan()

    const parser = new Parser(scanner.tokens)

    parser.parse()

    expect(scanner.tokens).toHaveLength(5)
  })
})
