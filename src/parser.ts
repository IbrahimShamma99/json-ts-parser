import { ArrayExpression } from './expressions/array.expression'
import { BinaryExpression } from './expressions/binary.expression'
import { ObjectExpression } from './expressions/object.expression'
import { Identifier } from './identifiers/identifier'
import { BooleanLiteral } from './literals/boolean.literal'
import { NullLiteral } from './literals/null.literal'
import { NumericLiteral } from './literals/numeric.literal'
import { StringLiteral } from './literals/string.literal'
import { Token, TokenType } from './types'

export class Parser {
  public tree!: ObjectExpression | ArrayExpression

  private current: number = 0

  private readonly tokens!: Token[]

  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  parse() {
    this.tree = this.parseValue()
  }

  private parseValue() {
    if (this.match(TokenType.LEFT_BRACKET)) {
      return this.parseObject()
    } else if (this.match(TokenType.SQUARE_LEFT_BRACKET)) {
      throw new Error('Not Implemented')
      //return this.parseArray()
    } else {
      throw new Error('Invalid JSON')
    }
  }

  private parseArray() {}

  private parseObject() {
    const object = new ObjectExpression()

    this.currentToken
    do {
      const bnry = this.parseBnryExpr()
      object.exprs.push(bnry)
    } while (this.match(TokenType.COMMA))

    return object
  }

  public parseBnryExpr() {
    let left = new Identifier(this.currentToken.lexeme)
    this.advance()

    if (this.match(TokenType.COLON)) {
      const right = this.literal
      this.advance()
      return new BinaryExpression(
        left,
        this.previous as Token<TokenType.COLON>,
        right
      )
    }

    throw new Error('Invalid BNRY')
  }

  private get literal() {
    const token = this.currentToken
    if (token.type === TokenType.STRING) {
      return new StringLiteral(token.lexeme)
    } else if (token.type === TokenType.NUMBER) {
      return new NumericLiteral(token.lexeme)
    } else if (
      token.type === TokenType.TRUE ||
      token.type === TokenType.FALSE
    ) {
      return new BooleanLiteral(token.lexeme)
    } else if (token.type === TokenType.NULL) {
      return new NullLiteral(token.lexeme)
    }
    throw new Error('Invalid Literal Type')
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
