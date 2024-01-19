import { Visitor } from "../../interpreter/visitor";
import { Expression } from "./expression";
import { Variant } from "../variant";

export class GroupingExpression extends Expression {
  public override variant: Variant = "operation";

  constructor(public expression: Expression) {
    super();
  }
  public override accept<R>(visitor: Visitor<R>): R {
    // return visitor.visitGroupingExpr(this);
    throw new Error("Method not implemented.");
  }
  public override toLiteral<R>(): string {
    throw new Error("Method not implemented.");
  }
}
