import Value from "./value";

export default class ObjectGen extends Value {
  private obj: Record<string | number | symbol, Value>;
  constructor(obj: Record<string | number | symbol, Value>) {
    super();
    this.obj = obj;
  }
  public build(): string {
    const output = [];
    for (const key in this.obj) {
      const value = this.obj[key];
      if (value.line) throw new Error("Accessing data from a line of code is not allowed");
      output.push(`${ key || key.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)?key:JSON.stringify(key)}:${value.build()}`);
    }
    return "{" + output.join(",") + "}";
  }
}
