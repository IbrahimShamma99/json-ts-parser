import { Visitor } from "../visitors/visitor";
import { Expression } from "./expression";
import { Variant } from "../variant";

export class GroupByExpression extends Expression {
  public override variant: Variant = "group";
  public columns: Expression[] = [];

  public override accept<R>(visitor: Visitor<R>, context?: any): R {
    //return visitor.visitGroupByExpr(this, context);
    throw new Error("Method not implemented.");
  }
  public override toLiteral<R>(): string {
    throw new Error("Method not implemented.");
  }
}
