import { Identifier } from '../identifiers/identifier'
import { BooleanLiteral } from '../literals/boolean.literal'
import { NullLiteral } from '../literals/null.literal'
import { NumericLiteral } from '../literals/numeric.literal'
import { StringLiteral } from '../literals/string.literal'
import { ObjectLiteral } from '../literals/object.literal'
import { ArrayLiteral } from '../literals/array.literal'
import { BinaryExpression } from '../expressions/binary.expression'

export abstract class Visitor<R> {
  public abstract visitNumericLiteralExpr(expr: NumericLiteral): R
  public abstract visitNullLiteralExpr(expr: NullLiteral): R
  public abstract visitBooleanLiteralExpr(expr: BooleanLiteral): R
  public abstract visitStringLiteralExpr(expr: StringLiteral): R
  public abstract visitIdentifier(expr: Identifier): R
  public abstract visitObjectLiteral(expr: ObjectLiteral): R
  public abstract visitArrayLiteral(expr: ArrayLiteral): R
  public abstract visitBinaryExpr(expr: BinaryExpression): R
}
