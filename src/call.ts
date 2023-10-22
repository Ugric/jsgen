import { controlFlow } from "./controlFlow";
import Value, { scopeStack } from "./value";

export default class Call extends Value {
  private values: Value[];
  private func: Value;
  constructor(func: Value, ...values: Value[]) {
    super();
    this.func = func;
    this.values = values;
    if (this.func.line)
      throw new Error("Accessing data from a line of code is not allowed");
  }
  public build(): string {
    const output = [];
    for (let i = 0; i < this.values.length; i++) {
      const value = this.values[i];
      if (value.line)
        throw new Error("Accessing data from a line of code is not allowed");
      output.push(value.build());
    }
    return this.func.build() + "(" + output.join(",") + ")";
  }
  public run(stack: scopeStack) {
    const val = this.func.run(stack)(
      ...this.values.map((v) => {
        if (v.line)
          throw new Error("Accessing data from a line of code is not allowed");
        return v.run(stack);
      })
    );
    if (val instanceof controlFlow) {
      if (val.type == "return") return val.value;
      throw new Error(`Cannot ${val.type} inside a function`);
    }
    return val;
  }
}
