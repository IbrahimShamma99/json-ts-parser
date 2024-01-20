import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'
import { Literal } from './literal'

export class NumericLiteral extends Literal {
  public override variant: Variant = 'int'
  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitNumericLiteralExpr(this)
  }
  public override toLiteral<R>(): string {
    return this.value
  }
}
