import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'
import { Literal } from './literal'

export class NullLiteral extends Literal {
  public override variant: Variant = 'null'
  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitNullLiteralExpr(this)
  }
  public override toLiteral(): string {
    return 'null'
  }
}
