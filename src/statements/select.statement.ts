import { Expression } from "../expressions/expression";
import { GroupByExpression } from "../expressions/group_expression";
import { OrderExpression } from "../expressions/order_expression";
import { Identifier } from "../identifiers/identifier";
import { Variant } from "../variant";
import { Visitor } from "../visitors/visitor";
import { Statement } from "./statement";

export class SelectStatement extends Statement {
  public override variant: Variant = "select";
  public joins: Expression[] = [];
  public columns: (Identifier | Expression)[] = [];
  public from?: Expression | Identifier;
  public where?: Expression;
  public order?: OrderExpression;
  public group?: GroupByExpression;
  public distinct?: boolean = undefined;
  public all?: boolean = undefined;
  public limit?: Expression;

  public override accept<R>(visitor: Visitor<R>, context?: any): R {
    return visitor.visitSelectStmt(this, context);
  }
  public override toLiteral<R>(): string {
    throw new Error("Method not implemented.");
  }
}
