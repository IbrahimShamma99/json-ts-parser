import { Visitor } from "../../interpreter/visitor";
import { Varient } from "../variant";
import { Literal } from "./literal";

export class NumericLiteral extends Literal {
  public override varient: Varient = "int";
  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitNumericLiteralExpr(this);
  }
  public override toLiteral<R>(): string {
    return this.value;
  }
}
