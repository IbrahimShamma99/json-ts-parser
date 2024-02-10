import { ArrayExpression } from './expressions/array.expression'
import { ObjectExpression } from './expressions/object.expression'
import { Token, TokenType } from './types'

export class Parser {
  public tree: (ObjectExpression | ArrayExpression)[] = []

  private current: number = 0

  private readonly tokens!: Token[]

  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  parse() {
    while (!this.isAtEnd) {
      // this.tree.push(this.parseValue())
    }
  }

  private parseValue() {
    if (this.match(TokenType.LEFT_BRACKET)) {
      return this.parseObject()
    } else if (this.match(TokenType.SQUARE_LEFT_BRACKET)) {
      return this.parseArray()
    }
  }

  private parseArray() {}

  private parseObject() {
    // const object = new ObjectExpression()
    // while (!this.match(TokenType.RIGHT_BRACKET)) {
    //   object.add(this.parseObjectMember())
    // }
    // return object
  }

  private match(...tokens: TokenType[]) {
    if (this.check(...tokens)) {
      this.advance()
      return true
    }
    return false
  }

  private check(...tokens: TokenType[]): boolean {
    return tokens.includes(this.currentToken.type)
  }

  private get currentToken() {
    return this.tokens[this.current]
  }

  advance() {
    if (!this.isAtEnd) {
      this.current++
    }
    return this.previous
  }

  get isAtEnd() {
    return this.peek.type === TokenType.EOF
  }

  get peek() {
    return this.tokens[this.current]
  }

  get previous() {
    return this.tokens[this.current - 1]
  }
}
