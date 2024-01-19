import { Expression } from "../expressions/expression";
import { Varient } from "../variant";

export abstract class Literal extends Expression {
  public abstract override varient: Varient;

  constructor(public value: string) {
    super();
  }
}
