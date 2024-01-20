import { Scanner } from '../../src/compiler/scanner'

describe('Scanner Tests', () => {
  it('should scan a simple select statement', () => {
    const source = `
            SELECT
                id,
                user_name as username
                from users
                `

    const scanner = new Scanner(source)
    scanner.scan()

    expect(scanner.tokens).toHaveLength(9)
  })

  it('should scan a simple select statement with limit', () => {
    const source = `
            SELECT
                id,
                user_name as username
                from users
                limit 15
                `

    const scanner = new Scanner(source)
    scanner.scan()

    expect(scanner.tokens).toHaveLength(11)
  })
})
