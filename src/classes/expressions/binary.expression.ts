import { Visitor } from "../../interpreter/visitor";
import { Token, TokenType } from "../../tokens";
import { Expression } from "./expression";
import { Identifier } from "../identifiers/identifier";
import { Literal } from "../literals/literal";
import { Variant } from "../variant";

export type BinaryToken =
  | TokenType.IS_NOT
  | TokenType.NOT_ILIKE
  | TokenType.NOT_LIKE
  | TokenType.NOT_BETWEEN
  | TokenType.IS
  | TokenType.ILIKE
  | TokenType.LIKE
  | TokenType.BETWEEN
  | TokenType.AND
  | TokenType.OR
  | TokenType.BANG_EQUAL
  | TokenType.EQUAL
  | TokenType.LESS
  | TokenType.LESS_EQUAL
  | TokenType.GREATER
  | TokenType.GREATER_EQUAL
  | TokenType.PLUS
  | TokenType.MINUS
  | TokenType.MODULO
  | TokenType.STAR
  | TokenType.SLASH
  | TokenType.CONCAT;

export type FactoryToken = TokenType.MODULO | TokenType.STAR | TokenType.SLASH;

export class BinaryExpression extends Expression {
  public override variant: Variant = "operation";

  constructor(
    public left: Identifier | Expression,
    public operator: Token<BinaryToken>,
    public right: Literal | Expression
  ) {
    super();
  }

  public accept<R>(visitor: Visitor<R>, row: Record<string, any>): R {
    return visitor.visitBinaryExpr(this, row);
  }

  public toLiteral(): string {
    return `${this.left.toLiteral()} ${
      this.operator.lexeme
    } ${this.right.toLiteral()}`;
  }
}

// import * as ts from "typescript";
// ts.factory.createBinaryExpression(
// 	ts.factory.createNumericLiteral("10"),
// 	ts.factory.createToken(ts.SyntaxKind.GreaterThanEqualsToken),
// 	ts.factory.createNumericLiteral("20")
// );
