import { Generator } from "../../src";

describe("Generators Tests", () => {
  it("should generate from simple query", () => {
    const source = "SELECT user_name , id FROM users";

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

  it("should generate from simple query with where", () => {
    const source = "SELECT user_name , id FROM users where id = 'id1' ;";

    const generator = new Generator([
      { id: "id1", user_name: "user1" },
      { id: "id2", user_name: "user2" },
    ]);

    const results = generator.execute(source);

    expect(results).toEqual([{ user_name: "user1", id: "id1" }]);
  });

  it("should generate from simple query with where", () => {
    const source =
      "SELECT user_name as username , id FROM users where id = 'id1' ;";

    const generator = new Generator([
      { id: "id1", user_name: "user1" },
      { id: "id2", user_name: "user2" },
    ]);

    const results = generator.execute(source);

    generator.source;

    expect(results).toEqual([{ username: "user1", id: "id1" }]);
  });
});
