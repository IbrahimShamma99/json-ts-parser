import { JsVisitor } from "../visitors/js.visitor";
import { Scanner } from "./scanner";
import { Parser } from "./parser";
import { Token, TokenType } from "../tokens";
import { Statement } from "../statements/statement";

export class Generator {
  public source!: string;

  constructor(private data: Record<any, any>) {}

  run(jsCode: string) {
    return eval(this.generateCode(jsCode));
  }

  scan(sql: string): Token<TokenType>[] {
    const scanner = new Scanner(sql);
    scanner.scan();
    return scanner.tokens;
  }

  parse(tokens: Token<TokenType>[]): Statement[] {
    const parser = new Parser(tokens);
    return parser.parse();
  }

  visit(statements: Statement[]): string {
    const jsVisitor = new JsVisitor().execute(statements);
    return jsVisitor;
  }

  generateCode(source: string): string {
    this.source = source;
    const jsCode = `function run() { return ${JSON.stringify(
      this.data
    )}${source} } run()`;

    return jsCode;
  }

  execute(source: string): Record<any, any> {
    const tokens = this.scan(source);

    const ast = this.parse(tokens);

    const jsCode = this.visit(ast);

    return this.run(jsCode);
  }
}
