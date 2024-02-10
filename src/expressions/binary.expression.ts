import { Visitor } from '../visitors/visitor'
import { Token, TokenType } from '../types'
import { Expression } from './expression'
import { Identifier } from '../identifiers/identifier'
import { Literal } from '../literals/literal'
import { Variant } from '../variant'

export type BinaryToken = TokenType.COLON

export class BinaryExpression extends Expression {
  public override variant: Variant = 'operation'

  constructor(
    public left: Identifier,
    public operator: Token<BinaryToken>,
    public right: Literal
  ) {
    super()
  }

  public accept<R>(visitor: Visitor<R>): R {
    return visitor.visitBinaryExpr(this)
  }

  public toLiteral(): string {
    return `${this.left.toLiteral()} ${
      this.operator.lexeme
    } ${this.right.toLiteral()}`
  }
}
