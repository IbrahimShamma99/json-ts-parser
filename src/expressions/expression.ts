import { Visitor } from '../visitors/visitor'
import { Variant } from '../variant'

export abstract class Expression {
  public abstract variant: Variant

  public abstract accept<R>(visitor: Visitor<R>, context?: any): R
  public abstract toLiteral(): string
}
