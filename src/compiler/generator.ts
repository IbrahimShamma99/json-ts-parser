import { JsVisitor } from "../visitors/js.visitor";
import { Scanner } from "./scanner";
import { Parser } from "./parser";
import { Token, TokenType } from "../tokens";
import { Statement } from "../statements/statement";

export class Generator {
  public source!: string;
  public JsSource!: string;

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
    return new Parser(tokens).parse();
  }

  visit(statements: Statement[]): string {
    return new JsVisitor().execute(statements);
  }

  generateCode(source: string): string {
    this.source = source;
    const jsCode = `
    Array.prototype.orderBy = function (orderByConfigs) {
      return this.slice().sort((a, b) => {
        for (const orderByConfig of orderByConfigs) {
          const colValueA = a[orderByConfig.column];
          const colValueB = b[orderByConfig.column];

          if (orderByConfig.direction === 'ASC') {
            if (colValueA > colValueB) return 1;
            if (colValueA < colValueB) return -1;
          } else if (orderByConfig.direction === 'DESC') {
            if (colValueB > colValueA) return 1;
            if (colValueB < colValueA) return -1;
          } else {
            throw new Error('Invalid direction. Use "asc" or "desc".');
          }
        }

        return this;
      });
    }

    Array.prototype.groupBy = function (keys) {
      return this.reduce((result, item) => {
        const groupKey = keys.map((key) => item[key]).join("-");

        if (!result[groupKey]) {
          result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
      }, {});
    }
    function run() {
      return ${JSON.stringify(this.data)}${source}
    }
    run()`;
    this.JsSource = jsCode;
    return jsCode;
  }

  execute(source: string): Record<any, any> {
    const tokens = this.scan(source);
    const ast = this.parse(tokens);
    const jsCode = this.visit(ast);
    return this.run(jsCode);
  }
}
