import { Scanner } from '../../src'

describe('JSON Scanner Tests', () => {
  it('should scan a simple Empty JSON', () => {
    const source = `[{}]`

    const scanner = new Scanner(source)
    scanner.scan()

    expect(scanner.tokens).toHaveLength(5)
  })

  it('should scan a simple JSON', () => {
    const source = `{"name": "John Doe"}`

    const scanner = new Scanner(source)
    scanner.scan()

    expect(scanner.tokens).toHaveLength(6)
  })
})
