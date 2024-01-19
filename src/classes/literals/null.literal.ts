import { Visitor } from "../../interpreter/visitor";
import { Varient } from "../variant";
import { Literal } from "./literal";

export class NullLiteral extends Literal {
  public override varient: Varient = "string";
  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitNullLiteralExpr(this);
  }
  public override toLiteral(): string {
    return "NULL";
  }
}
