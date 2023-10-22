import Value, { scopeStack } from "./value";

export default class Var extends Value {
  private name: string;
  constructor(name: string) {
    super();
    if (!name.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
      throw new Error("Invalid variable name: " + name);
    }
    this.name = name;
  }
  public build(): string {
    return this.name;
  }
  public run(stack: scopeStack) {
    for (let i = stack.length - 1; i >= 0; i--) {
      const scope = stack[i];
      if (this.name in scope) return scope[this.name].value;
    }
    throw new Error("Variable not found: " + this.name);
  }
}
