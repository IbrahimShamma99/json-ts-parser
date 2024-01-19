import { Token, TokenType } from "./tokens";

export class Scanner {
  public tokens: Token<TokenType>[] = [];
  private start: number = 0;
  private current: number = 0;
  private line: number = 1;

  constructor(private readonly source: string) {
    this.source = this.source.toLowerCase();
  }

  private get showStopperKeywords() {
    return [
      " ",
      ")",
      "}",
      "\n",
      ";",
      ",",
      ".",
      "-",
      "+",
      "*",
      "!",
      "=",
      "<",
      ">",
    ];
  }

  private get reservedKeywords() {
    return [
      "select",
      "from",
      "where",
      "order",
      "by",
      "asc",
      "desc",
      "or",
      "and",
      "true",
      "false",
      "as",
      "not",
      "is",
      "null",
      "like",
      "between",
      "in",
      "inner",
      "join",
      "left",
      "right",
      "outer",
      "group",
      "having",
    ];
  }

  private checkCompleteKeyword = () => {
    let peek = this.peek();
    while (!this.showStopperKeywords.includes(peek) && !this.isAtEnd) {
      this.advance();
      peek = this.peek();
    }
  };

  scan = () => {
    while (!this.isAtEnd) {
      this.advance();
      this.start = this.current;
      this.scanTokens();
    }
    this.addToken(TokenType.EOF);
  };

  scanTokens = () => {
    const c = this.peek();
    switch (c) {
      case " ":
      case "\r":
      case "\t":
        break;
      case "\n":
        this.line++;
        break;
      case "(":
        this.addToken(TokenType.LEFT_PAREN, "(");
        break;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN, ")");
        break;
      case "{":
        this.addToken(TokenType.LEFT_BRACE, "{");
        break;
      case "}":
        this.addToken(TokenType.RIGHT_BRACE, "}");
        break;
      case ",":
        this.addToken(TokenType.COMMA, ",");
        break;
      case ".":
        this.addToken(TokenType.DOT, ".");
        break;
      case "-":
        this.addToken(TokenType.MINUS, "-");
        break;
      case "+":
        this.addToken(TokenType.PLUS, "+");
        break;
      case ";":
        this.addToken(TokenType.SEMICOLON, ";");
        break;
      case "*":
        this.addToken(TokenType.STAR, "*");
        break;
      case "!":
        this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG);
        break;
      case "=":
        this.addToken(TokenType.EQUAL, "=");
        break;
      case "<":
        this.addToken(this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case ">":
        this.addToken(
          this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER
        );
        break;
      case "'":
        this.string();
        break;

      default: {
        if (isDigit(c)) {
          this.digit();
        } else if (isEnglishChar(c)) {
          this.identifier();
        }
      }
    }
  };

  private string = () => {
    this.advance();
    while (this.peek() !== "'" && !this.isAtEnd) {
      this.advance();
    }
    if (this.isAtEnd) {
      throw new Error("Unterminated string.");
    }

    this.advance();

    this.addToken(TokenType.STRING);
  };

  private digit = () => {
    while (isDigit(this.peek())) {
      this.advance();
    }
    if (this.peek() === "." && isDigit(this.peekNext())) {
      this.advance();
      while (isDigit(this.peek())) {
        this.advance();
      }
    }
    this.addToken(TokenType.NUMBER);
  };

  private identifier = () => {
    this.checkCompleteKeyword();

    const isReserved = this.reservedKeywords.includes(this.lexeme);
    if (isReserved) {
      this.addToken(TokenType[this.lexeme.toUpperCase() as TokenType]);
      return;
    }
    this.addToken(TokenType.IDENTIFIER);
    if (this.peek() === ",") {
      this.addToken(TokenType.COMMA);
      this.advance();
    }
  };

  private get isAtEnd() {
    return this.current >= this.source.length;
  }

  private peek() {
    if (this.isAtEnd) return "\0";
    return this.source[this.current - 1];
  }

  private peekNext() {
    if (this.current + 1 >= this.source.length) return "\0";
    return this.source[this.current + 1];
  }

  private get lexeme() {
    return this.source.substring(this.start - 1, this.current - 1);
  }

  private addToken = (type: TokenType, lexeme?: string) => {
    this.tokens.push(
      new Token({
        type,
        lexeme: lexeme || this.lexeme,
        line: this.line,
        end: this.current,
        start: this.start,
      })
    );
  };

  private advance = () => {
    this.current++;
  };

  private match(expected: string): boolean {
    if (this.isAtEnd) return false;
    if (this.source.charAt(this.current) != expected) return false;
    this.current++;
    return true;
  }
}

const isDigit = (c: string) => {
  return c >= "0" && c <= "9";
};

const isEnglishChar = (c: string) => {
  return c >= "a" && c <= "z";
};
