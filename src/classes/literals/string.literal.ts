import { Visitor } from "../../interpreter/visitor";
import { Varient } from "../variant";
import { Literal } from "./literal";

export class StringLiteral extends Literal {
  public override varient: Varient = "string";
  public override accept<R>(visitor: Visitor<R>): R {
    return visitor.visitStringLiteralExpr(this);
  }
  public override toLiteral<R>(): string {
    throw new Error("Method not implemented.");
  }
}
