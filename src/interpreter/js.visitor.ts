import { BinaryExpression } from "../classes/expressions/binary.expression";
import { LimitExpression } from "../classes/expressions/limit.expression";
import { Identifier } from "../classes/identifiers/identifier";
import { SelectStatement } from "../classes/statements/select.statement";
import { Statement } from "../classes/statements/statement";
import { Visitor } from "./visitor";

export class JsVisitor extends Visitor<string> {
  public execute(stmts: Statement[]) {
    const select = stmts.find((item) => item instanceof SelectStatement);
    if (!select) {
      throw new Error();
    }
    return select.accept(this);
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
      ? `.filter((item) => ${stmt.where.accept(this)})`
      : "";

    const limit = stmt.limit ? `.slice(0, ${stmt.limit.accept(this)})` : "";

    return `${select}${where}${limit}`;
  }
}
