import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'
import { Expression } from './expression'
import { BinaryExpression } from './binary.expression'

export class ObjectExpression extends Expression {
  public override variant: Variant = 'object'

  public exprs: BinaryExpression[] = []

  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitObjectExpr(this)
  }

  public toLiteral(): string {
    return 'ObjectExpression'
  }

  constructor() {
    super()
  }
}
