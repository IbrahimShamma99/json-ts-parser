import { Scanner } from "../../src/scanner";

describe("Scanner Tests", () => {
  it("should scan a simple select statement", () => {
    const source = `
            SELECT
                id,
                user_name as username
                from users
                `;

    const scanner = new Scanner(source);
    scanner.scan();

    expect(scanner.tokens).toMatchSnapshot("tokens");
  });
});
