import Any from "./Any";
import ArrowFunction from "./arrowFunction";
import Assign from "./assign";
import Block from "./block";
import Value, { scopeStack } from "./value";

export default class FunctionGen extends Value {
  constructor(private name: string|null, private args: string[], private body: Value) {
    super();
  }
  public build(): string {
    return `function ${this.name||""}(${this.args.join(",")})${new Block(this.body).build()}`
  }
  public run(stack: scopeStack) {
    return new Assign("var", this.name||"", new ArrowFunction(this.args, this.body)).run(stack);
  }
}
