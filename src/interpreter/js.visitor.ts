import { BinaryExpression } from "../classes/expressions/binary.expression";
import { LimitExpression } from "../classes/expressions/limit.expression";
import { Identifier } from "../classes/identifiers/identifier";
import { StringLiteral } from "../classes/literals/string.literal";
import { SelectStatement } from "../classes/statements/select.statement";
import { Statement } from "../classes/statements/statement";
import { TokenType } from "../tokens";
import { Visitor } from "./visitor";

export class JsVisitor extends Visitor<string> {
  public execute(stmts: Statement[]): string {
    const select = stmts.find((item) => item instanceof SelectStatement);
    if (!select) {
      throw new Error();
    }
    return select.accept(this);
  }

  public visitStringLiteralExpr(expr: StringLiteral): string {
    return expr.value;
  }

  public visitIdentifier(expr: Identifier): string {
    return expr.text;
  }

  public visitSelectStmt(stmt: SelectStatement, context?: any): string {
    const select = `.map((item) => ({
        ${stmt.columns.map(
          (node) => `${node.toLiteral()}: item.${node.accept(this)}`
        )}}))`;

    const where = stmt.where
      ? `.filter((item) => item.${stmt.where.accept(this)})`
      : "";

    const limit = stmt.limit ? `.slice(0, ${stmt.limit.accept(this)})` : "";

    return `${where}${select}${limit}`;
  }

  public visitBinaryExpr(expr: BinaryExpression, context: any): string {
    switch (expr.operator.type) {
      case TokenType.EQUAL:
        return `${expr.left.accept(this)} === ${expr.right.accept(this)}`;
        break;
      default:
        throw new Error("Invalid operator");
    }
  }
}
