import { Visitor } from "../../interpreter/visitor";
import { Variant } from "../variant";
import { Literal } from "./literal";

export class StringLiteral extends Literal {
  public override variant: Variant = "string";
  public override accept<R>(visitor: Visitor<R>): R {
    // return visitor.visitStringLiteralExpr(this);
    throw new Error("Method not implemented.");
  }
  public override toLiteral<R>(): string {
    throw new Error("Method not implemented.");
  }
}
