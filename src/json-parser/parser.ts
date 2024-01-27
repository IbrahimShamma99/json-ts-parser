import { Token, TokenType } from './types'

export class Parser {
  private current: number = 0

  constructor(private readonly tokens: Token) {}

  parse() {}

  match(token: Token) {
    if (this.check(token)) {
      this.advance()
      return true
    }
    return false
  }

  check(token: Token) {
    if (this.isAtEnd) {
      return false
    }
    return this.peek().type === token
  }

  advance() {
    if (!this.isAtEnd) {
      this.current++
    }
    return this.previous()
  }

  get isAtEnd() {
    return this.peek().type === TokenType.EOF
  }

  get peek() {
    return this.tokens[this.current]
  }

  get previous() {
    return this.tokens[this.current - 1]
  }
}
