import { BinaryExpression } from '../expressions/binary.expression'
import { GroupByExpression } from '../expressions/group_expression'
import { LimitExpression } from '../expressions/limit.expression'
import { OrderExpression } from '../expressions/order_expression'
import { OrderByColumn } from '../identifiers/column.identifier'
import { Identifier } from '../identifiers/identifier'
import { NumericLiteral } from '../literals/numeric.literal'
import { StringLiteral } from '../literals/string.literal'
import { SelectStatement } from '../statements/select.statement'
import { Statement } from '../statements/statement'
import { TokenType } from '../tokens'
import { Visitor } from './visitor'

export class JsVisitor extends Visitor<string> {
  public execute(stmts: Statement[]): string {
    const select = stmts.find((item) => item instanceof SelectStatement)
    if (!select) {
      throw new Error()
    }
    return select.accept(this)
  }

  public visitOrderByColumn(expr: OrderByColumn): string {
    return JSON.stringify({
      column: expr.expression.accept(this),
      direction: expr.direction,
    })
  }

  public visitOrderByExpr(expr: OrderExpression, context?: any): string {
    const columns = expr.columns.map((node) => ({
      ...JSON.parse(node.accept(this)),
    }))
    return JSON.stringify(columns)
  }

  public visitStringLiteralExpr(expr: StringLiteral): string {
    return expr.value
  }

  public visitIdentifier(expr: Identifier): string {
    return expr.text
  }

  public visitSelectStmt(stmt: SelectStatement, context?: any): string {
    const select = `.map((item) => ({
        ${stmt.columns.map(
          (node) => `${node.toLiteral()}: item.${node.accept(this)}`
        )}}))`

    const where = stmt.where
      ? `.filter((item) => item.${stmt.where.accept(this)})`
      : ''

    const group = stmt.group ? `.groupBy([${stmt.group.accept(this)}])` : ''

    const order = stmt.order ? `.orderBy(${stmt.order.accept(this)})` : ''

    const limit = stmt.limit ? `.limit(${stmt.limit.accept(this)})` : ''

    return `${where}${select}${group}${order}${limit}`
  }

  public visitBinaryExpr(expr: BinaryExpression, context: any): string {
    const keyOperatorMap = {
      [TokenType.EQUAL]: '===',
      [TokenType.BANG_EQUAL]: '!==',
      [TokenType.LESS]: '<',
      [TokenType.LESS_EQUAL]: '<=',
      [TokenType.GREATER]: '>',
      [TokenType.GREATER_EQUAL]: '>=',
    }

    switch (expr.operator.type) {
      case TokenType.EQUAL:
      case TokenType.BANG_EQUAL:
      case TokenType.LESS:
      case TokenType.LESS_EQUAL:
      case TokenType.GREATER:
      case TokenType.GREATER_EQUAL:
        const operator = keyOperatorMap[expr.operator.type]
        return `${expr.left.accept(
          this
        )} ${operator} ${expr.right.accept(this)}`

      default:
        throw new Error('Invalid operator or not implemented yet')
    }
  }

  public visitGroupByExpr(expr: GroupByExpression, context?: any): string {
    return expr.columns.map((node) => `'${node.accept(this)}'`).join(',')
  }

  public visitNumericLiteralExpr(expr: NumericLiteral): string {
    return expr.value
  }

  public visitLimitExpr(expr: LimitExpression, context?: any): string {
    return expr.expression.accept(this)
  }
}
