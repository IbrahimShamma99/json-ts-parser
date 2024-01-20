import { TokenType } from './tokentype'
export * from './tokentype'

export class Token<T extends TokenType> {
  public readonly type: T
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
    type: T
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
