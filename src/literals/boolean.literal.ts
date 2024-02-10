import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'
import { Literal } from './literal'

export class BooleanLiteral extends Literal {
  public override variant: Variant = 'number'
  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitBooleanLiteralExpr(this)
  }
  public override toLiteral<R>(): string {
    return this.value
  }
}
