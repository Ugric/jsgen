import Value, { scope, scopeStack, storedValue } from "./value";

export default class ArrowFunction extends Value {
  constructor(private args: string[], private body: Value) {
    super();
    if (this.body.line) throw new Error("Accessing data from a line of code is not allowed");
  }
  public build(): string {
    return `(${this.args.join(",")})=>${this.body.build()}`
  }
  public run(stack: scopeStack) {
    return (...args: any[]) => {
      const newScope: scope = {};
      for (let i = 0; i < this.args.length; i++) {
        newScope[this.args[i]] = new storedValue(args[i], "var");
      }
      return this.body.run([...stack, newScope]);
    }
  }
}
