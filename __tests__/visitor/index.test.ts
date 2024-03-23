import { Scanner, Parser, TSVisitor } from '../../src'

describe('JSON TS Visitor Tests', () => {
  it('should create a type out of json', () => {
    const source =
      '{"name": "John Doe", "age": 16, "isStudent": true , "gradDate": null}'
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    const type = new TSVisitor().execute(parser.tree, 'Student')
    expect(type).toContain('name: string')
    expect(type).toContain('age: number')
    expect(type).toContain('isStudent: boolean')
    expect(type).toContain('gradDate: null')
  })

  it('should create a type for Array of numbers', () => {
    const source = `[
      5 , 4 , 8
    ]`
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    const type = new TSVisitor().execute(parser.tree, 'Arr')
    expect(type).toContain('(number)[]')
  })

  it('should create a type for Array of numbers & strings', () => {
    const source = `[
      5 , "username" , 8
    ]`
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    const type = new TSVisitor().execute(parser.tree, 'Arr')
    expect(type).toContain('(number | string)[]')
  })

  it('should create a type for Array of nullable numbers & strings', () => {
    const source = `[
      5 , "username" , null
    ]`
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    const type = new TSVisitor().execute(parser.tree, 'Arr')
    expect(type).toContain('(number | string | null)[]')
  })

  it('should create a type for Array of nullable numbers, strings or even objects ', () => {
    const source = `[
      5 , "username" , null , {
        "username": "John Doe"
      }
    ]`
    const scanner = new Scanner(source)
    scanner.scan()
    const parser = new Parser(scanner.tokens)
    parser.parse()
    const type = new TSVisitor().execute(parser.tree, 'Arr')
    expect(type).toContain('(number | string | null | { username: string })[]')
  })
})
