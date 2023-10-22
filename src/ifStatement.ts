import Value from "./value";

type Statement = [Value, Value];

export default class If extends Value {
  public line = true;
  private statements: Statement[];
  private elseStatement?: Value;
  constructor(statements: Statement[], elseStatement?: Value) {
    super();
    this.statements = statements;
    this.elseStatement = elseStatement;
  }
  public build(): string {
    const output = [];
    for (let i = 0; i < this.statements.length; i++) {
      if (i !== 0) output.push("else ");
      const statement = this.statements[i];
      if (statement[0].line) throw new Error("Accessing data from a line of code is not allowed");
      output.push("if(" + statement[0].build() + "){");
      output.push(statement[1].build());
      output.push("}");
    }
    if (this.elseStatement) {
      output.push("else{");
      output.push(this.elseStatement.build());
      output.push("}");
    }
    return output.join("");
  }
}
