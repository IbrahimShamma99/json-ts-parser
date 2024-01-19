import { JsVisitor } from "./interpreter/js.visitor";
import { Scanner } from "./scanner";
import { Parser } from "./parser";
import { Token, TokenType } from "./tokens";
import { Statement } from "./classes/statements/statement";

export class Generator {
  constructor(private data: Record<any, any>) {}

  run(sql: string) {
    const scanner = new Scanner(sql);
    scanner.scan();

    const parser = new Parser(scanner.tokens);

    const tree = parser.parse();

    const jsVisitor = new JsVisitor().execute(tree);

    const jsCode = `function run() { return ${JSON.stringify(
      this.data
    )}${jsVisitor} } run()`;

    return eval(jsCode);
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
    const jsCode = `function run() { return ${JSON.stringify(
      this.data
    )}${source} } run()`;

    return jsCode;
  }

  execute(source: string): any {
    const jsCode = this.generateCode(source);
    return eval(jsCode);
  }
}
