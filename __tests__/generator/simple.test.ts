import { Generator } from "../../src";

describe("Generators Tests", () => {
  it("should generate from simple query", () => {
    const source = "SELECT user_name , id FROM users ";

    const generator = new Generator([
      { id: "id1", user_name: "user1" },
      { id: "id2", user_name: "user2" },
    ]);

    const results = generator.execute(source);

    expect(results).toEqual([
      { user_name: "user1", id: "id1" },
      { user_name: "user2", id: "id2" },
    ]);
  });
});
