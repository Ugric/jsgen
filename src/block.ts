import { controlFlow } from "./controlFlow";
import Value, { scopeStack } from "./value";

export default class Block extends Value {
  constructor(private value: Value) {
    super();
  }
  public build(): string {
    return `{${this.value.build()}}`;
  }
  public run(stack: scopeStack) {
    const val = this.value.run([...stack, {}])
    if (val instanceof controlFlow) {
      if (val.type == "return") {
        return val.value;
      }
    }
  }
}