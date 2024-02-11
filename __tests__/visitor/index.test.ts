import { Scanner, Parser, TSVisitor } from '../../src'

describe('JSON TS Visitor Tests', () => {
  it('should create a type out of json', () => {
    const source =
      '{"name": "John Doe", "age": 16, "isStudent": true , "gradDate": null}'
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()

    const type = new TSVisitor().execute(parser.tree)

    expect(type).toContain('name: string')
    expect(type).toContain('age: number')
    expect(type).toContain('isStudent: boolean')
    expect(type).toContain('gradDate: null')
  })
})
