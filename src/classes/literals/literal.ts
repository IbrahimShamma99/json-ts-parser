import { Expression } from "../expressions/expression";
import { Variant } from "../variant";

export abstract class Literal extends Expression {
  public abstract override variant: Variant;

  constructor(public value: string) {
    super();
  }
}
