import { JsVisitor } from "../interpreter/js.visitor";
import { Scanner } from "../scanner";
import { Parser } from "../parser";

export const generate = (data: Record<any, any>, sql: string) => {
  const scanner = new Scanner(sql);
  scanner.scan();

  const parser = new Parser(scanner.tokens);

  const tree = parser.parse();

  const jsVisitor = new JsVisitor().execute(tree);

  console.log(jsVisitor);

  const jsCode = `function run() { return ${JSON.stringify(
    data
  )}${jsVisitor} } run()`;

  console.log(jsCode);

  return eval(jsCode);
};
