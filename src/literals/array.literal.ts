import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'
import { Literal } from './literal'

export class ArrayLiteral extends Literal {
  public override variant: Variant = 'object'
  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitArrayLiteral(this)
  }
  public override toLiteral<R>(): string {
    return this.value
  }
}
