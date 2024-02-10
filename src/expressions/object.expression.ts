import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'
import { Expression } from './expression'

export class ObjectExpression extends Expression {
  public override variant: Variant = 'object'

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
