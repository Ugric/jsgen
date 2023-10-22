import Value, { scopeStack } from "./value";

export default class Access extends Value {
  private value: Value;
  private keys: (Value | string)[];
  constructor(value: Value, ...keys: (Value | string)[]) {
    super();
    this.value = value;
    this.keys = keys;
  }
  public build(): string {
    if (this.value.line) {
      throw new Error("Accessing data from a line of code is not allowed");
    }
    const values: string[] = [this.value.build()];
    for (const key of this.keys) {
      let keyVal: string;
      if (typeof key == "string") {
        keyVal = key;
      } else {
        if (key.line) {
          throw new Error("Accessing data from a line of code is not allowed");
        }
        keyVal = key.build();
      }
      const brackets = !keyVal.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/);
      values.push((brackets ? "[" : ".") + keyVal + (brackets ? "]" : ""));
    }
    return values.join("");
  }
  public run(stack: scopeStack) {
    let value = this.value.run(stack);
    for (const key of this.keys) {
      value = value[typeof key == "string"?key:key.run(stack)];
    }
    return value;
  }
}
