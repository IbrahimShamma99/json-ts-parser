import { Identifier } from '../identifiers/identifier'
import { ArrayLiteral } from '../literals/array.literal'
import { BooleanLiteral } from '../literals/boolean.literal'
import { NullLiteral } from '../literals/null.literal'
import { NumericLiteral } from '../literals/numeric.literal'
import { ObjectLiteral } from '../literals/object.literal'
import { StringLiteral } from '../literals/string.literal'
import { Visitor } from './visitor'

export class TSVisitor extends Visitor<string> {
  public visitNumericLiteralExpr(expr: NumericLiteral): string {
    return `visitNumericLiteralExpr(${expr})`
  }

  public visitNullLiteralExpr(expr: NullLiteral): string {
    return `visitNullLiteralExpr(${expr})`
  }

  public visitBooleanLiteralExpr(expr: BooleanLiteral): string {
    return `visitBooleanLiteralExpr(${expr})`
  }

  public visitStringLiteralExpr(expr: StringLiteral): string {
    return `visitStringLiteralExpr(${expr})`
  }

  public visitIdentifier(expr: Identifier): string {
    return `visitIdentifier(${expr})`
  }

  public visitObjectLiteral(expr: ObjectLiteral): string {
    return `visitObjectLiteral(${expr})`
  }

  public visitArrayLiteral(expr: ArrayLiteral): string {
    return `visitArrayLiteral(${expr})`
  }

  public visitBinaryExpr(expr: any): string {
    return `visitBinaryExpr(${expr})`
  }
}
