import Value, { scopeStack } from "./value";

export default class ArrayGen extends Value {
  private values: Value[];
  constructor(values: Value[]) {
    super();
    this.values = values;
  }
  public build(): string {
    const output = [];
    for (let i = 0; i < this.values.length; i++) {
      const value = this.values[i];
      if (value.line) throw new Error("Accessing data from a line of code is not allowed");
      output.push(value.build());
    }
    return "[" + output.join(",") + "]";
  }
  public run(stack: scopeStack) {
    const output = [];
    for (let i = 0; i < this.values.length; i++) {
      const value = this.values[i];
      output.push(value.run(stack));
    }
    return output;
  }
}
