export enum TokenType {
  DOT = 'DOT',
  COMMA = 'COMMA',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  EOF = 'EOF',
  LEFT_BRACKET = 'LEFT_BRACKET',
  RIGHT_BRACKET = 'RIGHT_BRACKET',
  COLON = 'COLON',
  BOOLEAN = 'BOOLEAN',
  SQUARE_LEFT_BRACKET = 'SQUARE_LEFT_BRACKET',
  SQUARE_RIGHT_BRACKET = 'SQUARE_RIGHT_BRACKET',
  IDENTIFIER = 'IDENTIFIER',

  FALSE = 'FALSE',
  TRUE = 'TRUE',
  NULL = 'NULL',
}

export class Token {
  public readonly type: TokenType
  public readonly lexeme: string
  public readonly line: number
  public readonly start: number
  public readonly end: number

  constructor({
    type,
    lexeme,
    line,
    start,
    end,
  }: {
    type: TokenType
    lexeme: string
    line: number
    start: number
    end: number
  }) {
    this.type = type
    this.lexeme = lexeme
    this.line = line
    this.start = start
    this.end = end
  }
}
