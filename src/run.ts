import { Scanner } from "./scanner";
import { Parser } from "./parser";
import { JsVisitor } from "./interpreter/js.visitor";
import { generate } from "./sql-js";

const run = async () => {
  const source = `
    SELECT
      id,
      user_name as username

        from users as u

        ;
      `;

  const results = generate(
    [
      { user_name: "user1", id: "id1" },
      { user_name: "user2", id: "id2" },
    ],
    source
  );

  console.log(results);
};

run();
