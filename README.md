# SQL into JS Runtime (Node.js)

## Fun Project with SQL and JS

### Props to [Crafting Interpreters](https://craftinginterpreters.com/) && [SQL-Tooling](https://github.com/ezzabuzaid/sql-tooling) for the knowledge and inspiration

#### Example

```ts
import { Generator } from 'sql-js-data-mapper'

const generator = new Generator([
  { id: 'id1', user_name: 'user1' },
  { id: 'id2', user_name: 'user2' },
])

generator.execute(`
  SELECT id, user_name as username
  FROM users
  WHERE id = 'id1'
`)

// returns [{ id: "id1", username: "user1" }]
```

### For More examples, check [here](https://github.com/IbrahimShamma99/sql-js-tiny-compiler/blob/master/__tests__/generator/simple.test.ts)

## TODO List

- [x] Basic SQL Parser
- [x] Accept Where in Select Statement
- [x] Accept Group By in Select Statement
- [x] Accept Order By in Select Statement
- [ ] Accept JSON Objects in From Statement
- [ ] Add Support Aggregates Functions inside Select Statement
- [ ] Make Order by accept Numeric Expressions and Aggregate Functions
- [ ] Support sub-queries in Select Statement
- [ ] Ask for AST from Select Statement Parser
- [ ] SQL Syntax Analyzer
