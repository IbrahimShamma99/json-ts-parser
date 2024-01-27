import { Scanner } from '../../src/json-parser/scanner'

describe('JSON Scanner Tests', () => {
  it('should scan a simple Empty JSON', () => {
    const source = `[{}]`

    const scanner = new Scanner(source)
    scanner.scan()

    expect(scanner.tokens).toHaveLength(5)
  })

  it('should scan a simple JSON with strings ', () => {
    const source = `[{ "is_user": true , "age": 20 }]`

    const scanner = new Scanner(source)
    scanner.scan()

    expect(scanner.tokens).toHaveLength(12)
  })

  it('should scan a JSON with inner schemas', () => {
    const source = `[{
      "user": {
        "name": "John",
        "age": 20
      }
    }]`

    const scanner = new Scanner(source)
    scanner.scan()

    expect(scanner.tokens).toHaveLength(16)
  })
})
