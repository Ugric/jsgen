import Value, { scopeStack } from "./value";

export class Brackets extends Value {
  constructor(private value: Value) {
    super();
  }
  public build(): string {
    if (this.value.line) throw new Error("Cannot contain a line");
    return `(${this.value.build()})`;
  }
  public run(stack: scopeStack) {
    return this.value.run(stack);
  }
}