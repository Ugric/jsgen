import { controlFlow } from "./controlFlow";
import Value, { scopeStack } from "./value";

export default class Multi extends Value {
  public line = true;
  private values: Value[];
  constructor(...values: Value[]) {
    super();
    this.values = values;
  }
  public build(): string {
    return this.values.map((value) => value.build()).join(";");
  }
  public run(stack: scopeStack) {
    let val: any
    for (let i = 0; i < this.values.length; i++) {
      const value = this.values[i];
      val = value.run(stack);
      if (val instanceof controlFlow) return val;
    }
    return val
  }
}
