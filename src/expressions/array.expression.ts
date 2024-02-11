import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'
import { Expression } from './expression'

export class ArrayExpression extends Expression {
  public override variant: Variant = 'object'
  public exprs: Expression[] = []

  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitArrayExpr(this)
  }
  public override toLiteral<R>(): string {
    return 'ArrayLiteral'
  }
}
