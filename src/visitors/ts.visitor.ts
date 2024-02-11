import { Identifier } from '../identifiers/identifier'
import { ArrayExpression } from '../expressions/array.expression'
import { BooleanLiteral } from '../literals/boolean.literal'
import { NullLiteral } from '../literals/null.literal'
import { NumericLiteral } from '../literals/numeric.literal'
import { ObjectExpression } from '../expressions/object.expression'
import { StringLiteral } from '../literals/string.literal'
import { Visitor } from './visitor'
import { BinaryExpression } from '../expressions/binary.expression'

export class TSVisitor extends Visitor<string> {
  public execute(json: ObjectExpression | ArrayExpression): string {
    return json.accept(this)
  }

  public visitNumericLiteralExpr(expr: NumericLiteral): string {
    return `number`
  }

  public visitNullLiteralExpr(expr: NullLiteral): string {
    return `null`
  }

  public visitBooleanLiteralExpr(expr: BooleanLiteral): string {
    return `boolean`
  }

  public visitStringLiteralExpr(expr: StringLiteral): string {
    return `string`
  }

  public visitIdentifier(expr: Identifier): string {
    return `${expr.text}`
  }

  public visitObjectExpr(expr: ObjectExpression): string {
    return `{${expr.exprs.map((e) => e.accept(this)).join(', ')}}`
  }

  public visitArrayExpr(expr: ArrayExpression): string {
    return `visitArrayExpr(${expr})`
  }

  public visitBinaryExpr(expr: BinaryExpression): string {
    return `${expr.left.accept(this)}: ${expr.right.accept(this)}`
  }
}
