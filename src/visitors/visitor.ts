import { BinaryExpression } from "../expressions/binary.expression";
import { CallExpression } from "../expressions/call.expression";
import { OrderByColumn } from "../identifiers/column.identifier";
import { GroupByExpression } from "../expressions/group_expression";
import { GroupingExpression } from "../expressions/grouping.expression";
import { Identifier } from "../identifiers/identifier";
import { LimitExpression } from "../expressions/limit.expression";
import { BooleanLiteral } from "../literals/boolean.literal";
import { NullLiteral } from "../literals/null.literal";
import { NumericLiteral } from "../literals/numeric.literal";
import { StringLiteral } from "../literals/string.literal";
import { OrderExpression } from "../expressions/order_expression";
import { SelectStatement } from "../statements/select.statement";
import { UnaryExpression } from "../expressions/unary.expression";

export abstract class Visitor<R> {
  // public abstract visitCallExpr(
  //   expr: CallExpression,
  //   context: Record<string, any>
  // ): R;
  // public abstract visitGroupingExpr(expr: GroupingExpression): R;
  // public abstract visitUnaryExpr(expr: UnaryExpression): R;
  public abstract visitNumericLiteralExpr(expr: NumericLiteral): R;
  public abstract visitBinaryExpr(expr: BinaryExpression, context: any): R;
  // public abstract visitNullLiteralExpr(expr: NullLiteral): R;
  // public abstract visitBooleanLiteralExpr(expr: BooleanLiteral): R;
  public abstract visitStringLiteralExpr(expr: StringLiteral): R;
  public abstract visitIdentifier(expr: Identifier): R;
  public abstract visitSelectStmt(stmt: SelectStatement, context?: any): R;
  public abstract visitGroupByExpr(expr: GroupByExpression, context?: any): R;
  // public abstract visitLimitExpr(expr: LimitExpression, context?: any): R;
  // public abstract visitOrderByExpr(expr: OrderExpression, context?: any): R;
  // public abstract visitOrderByColumn(expr: OrderByColumn): R;
}
