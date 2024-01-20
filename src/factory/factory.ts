import { Expression } from '../expressions/expression'
import { GroupByExpression } from '../expressions/group_expression'
import { LimitExpression } from '../expressions/limit.expression'
import { OrderExpression } from '../expressions/order_expression'
import { UnaryExpression, UnaryToken } from '../expressions/unary.expression'
import { OrderByColumn } from '../identifiers/column.identifier'
import { Identifier } from '../identifiers/identifier'
import { NumericLiteral } from '../literals/numeric.literal'
import { SelectStatement } from '../statements/select.statement'
import { TokenType, Token } from '../tokens'

export class Factory {
  public createSelectStatement(
    columns: (Expression | Identifier)[],
    from?: Expression,
    where?: Expression,
    order?: OrderExpression,
    limit?: LimitExpression
  ): SelectStatement {
    const statement = new SelectStatement()
    statement.columns = columns
    statement.from = from
    statement.where = where
    statement.order = order
    statement.limit = limit
    return statement
  }

  public createGroupByExpression(
    columns: (Expression | Identifier)[]
  ): GroupByExpression {
    const groupBy = new GroupByExpression()
    groupBy.columns = columns

    return groupBy
  }

  public createOrderByExpression(columns: OrderByColumn[]): OrderExpression {
    const order = new OrderExpression()
    order.columns = columns
    return order
  }

  public createLimitExpression(limit: Expression): LimitExpression {
    return new LimitExpression(limit)
  }

  public createIdentifier(name: string, alias?: string): Identifier {
    return new Identifier(name, alias)
  }

  public createNumericLiteral(value: string): NumericLiteral {
    const numericLiteral = new NumericLiteral(value)
    return numericLiteral
  }

  public createUnaryExpression(
    operator: Token<UnaryToken>,
    right: Expression
  ): UnaryExpression {
    return new UnaryExpression(operator, right)
  }
}
export function getKeyByValue(object: Record<string, any>, value: TokenType) {
  return Object.keys(object).find((key) => object[key] === value)
}
export const keywords: Record<string, TokenType> = {
  as: TokenType.AS,
  by: TokenType.BY,
  select: TokenType.SELECT,
  view: TokenType.VIEW,
  create: TokenType.CREATE,
  table: TokenType.TABLE,
  integer: TokenType.INTEGER,
  int: TokenType.INTEGER,
  text: TokenType.TEXT,
  real: TokenType.REAL,
  bool: TokenType.BOOL,
  boolean: TokenType.BOOL,
  date: TokenType.DATE,
  blob: TokenType.BLOB,
  unique: TokenType.UNIQUE,
  primary: TokenType.PRIMARY,
  key: TokenType.KEY,
  temp: TokenType.TEMP,
  temporary: TokenType.TEMP,
  check: TokenType.CHECK,
  default: TokenType.DEFAULT,
  from: TokenType.FROM,
  desc: TokenType.DESC,
  asc: TokenType.ASC,
  order: TokenType.ORDER,
  group: TokenType.GROUP,
  having: TokenType.HAVING,
  where: TokenType.WHERE,
  and: TokenType.AND,
  or: TokenType.OR,
  is: TokenType.IS,
  not: TokenType.NOT,
  'is not': TokenType.IS_NOT,
  'not between': TokenType.NOT_BETWEEN,
  'not ilike': TokenType.NOT_ILIKE,
  'not like': TokenType.NOT_LIKE,
  all: TokenType.ALL,
  distinct: TokenType.DISTINCT,
  limit: TokenType.LIMIT,
  offset: TokenType.OFFSET,
  like: TokenType.LIKE,
  ilike: TokenType.ILIKE,
  null: TokenType.NULL,
  in: TokenType.IN,
  similar: TokenType.SIMILAR,
  between: TokenType.BETWEEN,
  true: TokenType.FALSE,
  false: TokenType.TRUE,
  exists: TokenType.EXISTS,
  join: TokenType.JOIN,
  cross: TokenType.CROSS,
  update: TokenType.UPDATE,
  set: TokenType.SET,
}
