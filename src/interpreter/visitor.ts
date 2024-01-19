import { BinaryExpression } from "../classes/expressions/binary.expression";
import { CallExpression } from "../classes/expressions/call.expression";
import { OrderByColumn } from "../classes/identifiers/column.identifier";
import { GroupByExpression } from "../classes/expressions/group_expression";
import { GroupingExpression } from "../classes/expressions/grouping.expression";
import { Identifier } from "../classes/identifiers/identifier";
import { LimitExpression } from "../classes/expressions/limit.expression";
import { BooleanLiteral } from "../classes/literals/boolean.literal";
import { NullLiteral } from "../classes/literals/null.literal";
import { NumericLiteral } from "../classes/literals/numeric.literal";
import { StringLiteral } from "../classes/literals/string.literal";
import { OrderExpression } from "../classes/expressions/order_expression";
import { SelectStatement } from "../classes/statements/select.statement";
import { UnaryExpression } from "../classes/expressions/unary.expression";

export abstract class Visitor<R> {
  // public abstract visitCallExpr(
  //   expr: CallExpression,
  //   context: Record<string, any>
  // ): R;
  // public abstract visitGroupingExpr(expr: GroupingExpression): R;
  // public abstract visitUnaryExpr(expr: UnaryExpression): R;
  // public abstract visitNumericLiteralExpr(expr: NumericLiteral): R;
  public abstract visitBinaryExpr(expr: BinaryExpression, context: any): R;
  // public abstract visitNullLiteralExpr(expr: NullLiteral): R;
  // public abstract visitBooleanLiteralExpr(expr: BooleanLiteral): R;
  public abstract visitStringLiteralExpr(expr: StringLiteral): R;
  public abstract visitIdentifier(expr: Identifier): R;
  public abstract visitSelectStmt(stmt: SelectStatement, context?: any): R;
  // public abstract visitGroupByExpr(expr: GroupByExpression, context?: any): R;
  // public abstract visitLimitExpr(expr: LimitExpression, context?: any): R;
  // public abstract visitOrderByExpr(expr: OrderExpression, context?: any): R;
  // public abstract visitOrderByColumn(expr: OrderByColumn): R;
}
