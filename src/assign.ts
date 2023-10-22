import Value, { scopeStack, storedValue } from "./value";

type types = "const"| "let" | "var"|null;

export default class Assign extends Value {
  constructor(private type:types, private name: string, private value: Value) {
    super();
    if (this.value.line) throw new Error("Accessing data from a line of code is not allowed");
  }
  public build(): string {
    return `${this.type||""} ${this.name}=${this.value.build()}`.trim();
  }
  public run(stack: scopeStack) {
    switch (this.type) {
      case "const":
        if (stack[stack.length-1][this.name]) {
          throw new Error(`Cannot redeclare const ${this.name}`);
        }
        stack[stack.length-1][this.name] = new storedValue(this.value.run(stack), "const");
        break;
      case "let":
        if (stack[stack.length-1][this.name]) {
          throw new Error(`Cannot redeclare let ${this.name}`);
        }
        stack[stack.length-1][this.name] = new storedValue(this.value.run(stack), "let");
        break;
      case "var":
        stack[stack.length-1][this.name] = new storedValue(this.value.run(stack), "var");
        break;
      default:
        const value = this.value.run(stack)
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i][this.name]) {
            if (stack[i][this.name].storedType === "const") {
              throw new Error(`Cannot reassign const ${this.name}`);
            }
            stack[i][this.name].value = value;
            return;
          }
        }
        stack[stack.length-1][this.name] = new storedValue(value, "var");
        return value
    }
    return undefined;
  }
}