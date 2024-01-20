import { BinaryExpression, BinaryToken } from '../expressions/binary.expression'
import { CallExpression } from '../expressions/call.expression'
import { Expression } from '../expressions/expression'
import { GroupingExpression } from '../expressions/grouping.expression'
import { BooleanLiteral } from '../literals/boolean.literal'
import { NullLiteral } from '../literals/null.literal'
import { StringLiteral } from '../literals/string.literal'
import { Statement } from '../statements/statement'
import { Factory, getKeyByValue, keywords } from '../factory/factory'
import { Token } from '../tokens'
import { TokenType } from '../tokens/tokentype'
import { OrderExpression } from '../expressions/order_expression'
import { OrderByColumn } from '../identifiers/column.identifier'

const factory = new Factory()

export class Parser {
  private current = 0

  constructor(private tokens: Token<TokenType>[]) {}

  private get currentToken() {
    return this.tokens[this.current]
  }

  parse(): Statement[] {
    const tree: Statement[] = []
    while (!this.isAtEnd) {
      let token = this.tokens[this.current]

      switch (token.type) {
        case TokenType.SELECT:
          const selectStatement = this.selectStatement()
          this.log(selectStatement)
          tree.push(selectStatement)
          //this.consume(TokenType.SEMICOLON, "Expect ';' after expression.");
          break
        default:
          throw new Error(`Unexpected token ${token.type}`)
      }
    }
    return tree
  }

  private selectStatement() {
    this.advance()
    const statement = factory.createSelectStatement([])
    if (this.match(TokenType.DISTINCT)) {
      statement.distinct = true
    } else if (this.match(TokenType.ALL)) {
      statement.all = true
    }

    do {
      const keyword = getKeyByValue(keywords, this.currentToken.type)

      if (keyword) {
        // allow keywords as column names
        statement.columns.push(
          factory.createIdentifier(this.currentToken.lexeme)
        )
        this.advance()
      } else {
        const columnName = this.expression()
        statement.columns.push(columnName)
      }
    } while (this.match(TokenType.COMMA))

    const columnsNames = statement.columns.map((node) => node.toLiteral())
    // Handling cases like "select *, id from test;""
    if (statement.columns.length > 1 && columnsNames.includes('*')) {
      throw new Error("Cannot use '*' with other columns")
    }

    if (this.match(TokenType.FROM)) {
      statement.from = this.expression()
    }

    if (this.match(TokenType.WHERE)) {
      statement.where = this.expression()
    }

    if (this.match(TokenType.GROUP)) {
      this.consume(TokenType.BY, "Expect 'BY' after 'GROUP'")
      while (
        !this.match(
          TokenType.ORDER,
          TokenType.LIMIT,
          TokenType.SEMICOLON,
          TokenType.EOF
        )
      ) {
        statement.group = factory.createGroupByExpression([])
        const columnName = this.expression()
        statement.group.columns.push(columnName)
        if (!this.match(TokenType.COMMA)) {
          break
        }
      }
    }
    if (statement.group && statement.group.columns.length === 0) {
      throw new Error("Expect at least one column after 'GROUP BY'")
    }

    if (this.match(TokenType.ORDER)) {
      this.consume(TokenType.BY, "Expect 'BY' after 'GROUP'")
      statement.order = factory.createOrderByExpression([])
      do {
        const columnName = this.orderByCol()
        statement.order.columns.push(columnName)
      } while (this.match(TokenType.COMMA))
    }

    if (statement.order && statement.order.columns.length === 0) {
      throw new Error("Expect at least one column / Expr after 'ORDER BY'")
    }

    if (this.match(TokenType.LIMIT) && this.match(TokenType.NUMBER)) {
    }

    return statement
  }

  orderByCol(): OrderByColumn {
    const expression = this.expression()
    const col = new OrderByColumn(expression)
    if (this.match(TokenType.DESC)) {
      col.direction = 'DESC'
    }
    return col
  }

  expression() {
    const expression = this.orCondition()
    if (this.match(TokenType.AS)) {
      expression.alias = this.currentToken.lexeme
      this.advance()
    }
    return expression
  }

  private orCondition(): Expression {
    let expression: Expression = this.andConditions()
    while (this.match(TokenType.OR)) {
      const operator = this.previous<BinaryToken>()
      const right = this.andConditions()
      expression = new BinaryExpression(expression, operator, right)
    }
    return expression
  }

  private andConditions(): Expression {
    let expression: Expression = this.equality()
    while (this.match(TokenType.AND)) {
      const operator = this.previous<BinaryToken>()
      const right = this.equality()
      expression = new BinaryExpression(expression, operator, right)
    }
    return expression
  }

  private factor(): Expression {
    let expression = this.unary()
    while (
      this.match(
        TokenType.SLASH,
        TokenType.STAR,
        TokenType.MODULO,
        TokenType.CONCAT
      )
    ) {
      const operator = this.previous<BinaryToken>()
      const right = this.unary()
      expression = new BinaryExpression(expression, operator, right)
    }
    return expression
  }

  private term(): Expression {
    let expression = this.factor()
    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.previous<BinaryToken>()
      const right = this.factor()
      expression = new BinaryExpression(expression, operator, right)
    }
    return expression
  }

  private rangeContainment(): Expression {
    let expression = this.term()
    if (this.match(TokenType.NOT_BETWEEN, TokenType.BETWEEN)) {
      const operator = this.previous<BinaryToken>()
      const right = this.andConditions()
      expression = new BinaryExpression(expression, operator, right)
      return expression
    }

    if (
      this.match(
        TokenType.NOT_ILIKE,
        TokenType.NOT_LIKE,
        TokenType.IN,
        TokenType.LIKE,
        TokenType.ILIKE,
        TokenType.SIMILAR
      )
    ) {
      const operator = this.previous<BinaryToken>()
      const right = this.term()
      expression = new BinaryExpression(expression, operator, right)
    }
    return expression
  }

  private comparison(): Expression {
    let expression = this.rangeContainment()
    while (
      this.match(
        TokenType.LESS,
        TokenType.LESS_EQUAL,
        TokenType.GREATER,
        TokenType.GREATER_EQUAL
      )
    ) {
      const operator = this.previous<BinaryToken>()
      const right = this.rangeContainment()
      expression = new BinaryExpression(expression, operator, right)
    }
    return expression
  }

  private equality(): Expression {
    let expression: Expression = this.comparison()

    while (
      this.match(
        TokenType.EQUAL,
        TokenType.BANG_EQUAL,
        TokenType.IS,
        TokenType.IS_NOT
      )
    ) {
      const operator = this.previous<BinaryToken>()
      const right = this.comparison()
      expression = new BinaryExpression(expression, operator, right)
    }
    return expression
  }

  private advance() {
    return this.tokens[++this.current]
  }

  private previous<T extends TokenType>() {
    return this.tokens[this.current - 1] as Token<T>
  }

  private match(...tokens: TokenType[]) {
    if (this.check(...tokens)) {
      this.advance()
      return true
    }
    return false
  }

  private check(...tokens: TokenType[]): boolean {
    return tokens.includes(this.currentToken.type)
  }

  private get isAtEnd() {
    const token = this.tokens[this.current]
    return token.type === TokenType.EOF
  }

  private consume(type: TokenType, message: string) {
    if (this.check(type)) return this.advance()
    const error = new Error(message)
    Error.captureStackTrace(error, this.consume)
    throw error
  }

  private finishCall(callee: Expression): Expression {
    const args: Expression[] = []
    if (!this.match(TokenType.RIGHT_PAREN)) {
      do {
        args.push(this.expression())
      } while (this.match(TokenType.COMMA))
    }
    this.consume(TokenType.RIGHT_PAREN, "Expect ')' after arguments.")

    return new CallExpression(callee, args)
  }

  private call(): Expression {
    let expression = this.primary()
    while (true) {
      if (this.match(TokenType.LEFT_PAREN)) {
        expression = this.finishCall(expression)
      } else {
        break
      }
    }
    return expression
  }

  private unary(): Expression {
    if (this.match(TokenType.NOT, TokenType.MINUS, TokenType.EXISTS)) {
      const right = this.unary()
      return factory.createUnaryExpression(this.previous(), right)
    }

    return this.call()
  }

  private primary(): Expression {
    const token = this.currentToken

    if (this.match(TokenType.STAR)) {
      return factory.createIdentifier(token.lexeme)
    }

    //FIXME if (this.match(TokenType.DISTINCT)) {
    // 	let expression = this.expression();
    // 	return factory.createIdentifier(token.lexeme);
    // }

    if (this.match(TokenType.IDENTIFIER)) {
      return factory.createIdentifier(token.lexeme)
    }

    if (this.match(TokenType.NUMBER)) {
      return factory.createNumericLiteral(token.lexeme)
    }

    if (this.match(TokenType.FALSE, TokenType.TRUE)) {
      return new BooleanLiteral(token.lexeme)
    }

    if (this.match(TokenType.STRING)) {
      return new StringLiteral(token.lexeme)
    }

    if (this.match(TokenType.NULL)) {
      return new NullLiteral(token.lexeme)
    }

    if (this.match(TokenType.LEFT_PAREN)) {
      switch (this.currentToken.type) {
        case TokenType.SELECT:
          let selectStatement = this.selectStatement()
          this.log(selectStatement)
          this.consume(
            TokenType.RIGHT_PAREN,
            "Expect ')' at the end of 'SELECT statement'"
          )
          return selectStatement
        default:
          let expression = this.expression()
          expression = new GroupingExpression(expression)
          this.consume(TokenType.RIGHT_PAREN, "Expect ')'")
          return expression
      }
    }

    throw new Error('Unknown Primary' + token)
  }

  private log(...args: any[]) {
    console.log(...args)
  }
}
