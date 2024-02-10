import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'
import { Literal } from './literal'

export class ObjectLiteral extends Literal {
  public override variant: Variant = 'object'
  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitObjectLiteral(this)
  }
  public override toLiteral<R>(): string {
    return this.value
  }
}
