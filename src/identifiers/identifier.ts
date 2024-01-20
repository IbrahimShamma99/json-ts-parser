import { Visitor } from "../visitors/visitor";
import { Variant } from "../variant";

export class Identifier {
  constructor(public text: string, public alias?: string) {}

  public variant!: Variant;

  public accept<R>(visitor: Visitor<R>): R {
    return visitor.visitIdentifier(this);
  }

  public toLiteral(): string {
    return this.alias || this.text;
  }
}
