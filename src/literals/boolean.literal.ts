import { Visitor } from "../visitors/visitor";
import { Variant } from "../variant";
import { Literal } from "./literal";

export class BooleanLiteral extends Literal {
  public override variant: Variant = "boolean";
  public override accept<R>(visitor: Visitor<R>): R {
    //    return visitor.visitBooleanLiteralExpr(this);
    throw new Error("Method not implemented.");
  }

  public override toLiteral(): string {
    return this.value ? "TRUE" : "FALSE";
  }
}
