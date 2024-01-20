import { Visitor } from "../visitors/visitor";
import { Expression } from "./expression";
import { Variant } from "../variant";

export class CallExpression extends Expression {
  public override variant: Variant = "call";
  constructor(public callee: Expression, public args: Expression[] = []) {
    super();
  }

  public override accept<R>(visitor: Visitor<R>, context?: any): R {
    //return visitor.visitCallExpr(this, context);
    throw new Error("Method not implemented.");
  }

  public override toLiteral(): string {
    return (
      this.alias ?? `${this.callee.toLiteral()}(${this.args[0].toLiteral()})`
    );
  }
}
