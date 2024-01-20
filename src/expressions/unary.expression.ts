import { Visitor } from "../visitors/visitor";
import { Token, TokenType } from "../tokens";
import { Expression } from "./expression";
import { Variant } from "../variant";

export type UnaryToken = TokenType.MINUS | TokenType.NOT;

export class UnaryExpression extends Expression {
  public override variant: Variant = "operation";

  constructor(public operator: Token<UnaryToken>, public right: Expression) {
    super();
  }
  public override accept<R>(visitor: Visitor<R>): R {
    // return visitor.visitUnaryExpr(this);
    throw new Error("Method not implemented.");
  }
  public override toLiteral<R>(): string {
    throw new Error("Method not implemented.");
  }
}
