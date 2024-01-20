import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'
import { Literal } from './literal'

export class NullLiteral extends Literal {
  public override variant: Variant = 'string'
  public override accept<R>(visitor: Visitor<R>): R {
    //    return visitor.visitNullLiteralExpr(this);
    throw new Error('Method not implemented.')
  }
  public override toLiteral(): string {
    return 'NULL'
  }
}
