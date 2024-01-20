import { Visitor } from "../visitors/visitor";
import { OrderByColumn } from "../identifiers/column.identifier";
import { Expression } from "./expression";
import { Variant } from "../variant";

export class OrderExpression extends Expression {
  public override variant: Variant = "order";
  public columns: OrderByColumn[] = [];
  public override accept<R>(visitor: Visitor<R>): R {
    // return visitor.visitOrderByExpr(this);
    throw new Error("Method not implemented.");
  }
  public override toLiteral<R>(): string {
    throw new Error("Method not implemented.");
  }
}
