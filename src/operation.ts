import Any from "./Any";
import Value, { scope, scopeStack } from "./value";

const validOperations = [
  "+",
  "-",
  "*",
  "**",
  "/",
  "%",
  ">",
  "<",
  ">=",
  "<=",
  "==",
  "!=",
  "&&",
  "||",
];
type operation =
  | "+"
  | "-"
  | "*"
  | "**"
  | "/"
  | "%"
  | ">"
  | "<"
  | ">="
  | "<="
  | "=="
  | "!="
  | "&&"
  | "||";

export default function operGen(strings: TemplateStringsArray, ...values: Value[]) {
  const output: (Value | operation)[] = [];
  for (let i = 0; i < strings.length; i++) {
    const opperation = strings[i].trim();
    if (opperation.length != 0 || i != 0 && i != strings.length - 1) {
      if (!validOperations.includes(opperation))
        throw new Error("Invalid operator");
      output.push(opperation as operation);
    }
    if (values[i]) output.push(values[i]);
  }
  return new Operations(...output);
}

export class Operations extends Value {
  private value: (Value | operation)[];
  constructor(...value: (Value | operation)[]) {
    super();
    if (value.length < 3 || value.length % 2 == 0) {
      throw new Error("Invalid number of arguments");
    }
    for (let i = 1; i < value.length; i += 2) {
      if (
        value[i] instanceof Value ||
        !validOperations.includes(value[i] as string)
      ) {
        throw new Error("Invalid operator");
      }
    }
    this.value = value;
  }
  public build(): string {
    const output = [];
    for (let i = 0; i < this.value.length; i++) {
      const value = this.value[i];
      if (value instanceof Value) {
        if (value.line)
          throw new Error("Accessing data from a line of code is not allowed");
        output.push(value.build());
      } else {
        output.push(value);
      }
    }
    return `${output.join("")}`;
  }
  public run(stack: scopeStack) {
    return runOperations(this.value, stack);
  }
}

function runOperations(operations: (Value | string)[], stack: scopeStack) {
  if (operations.length == 1) {
    return (operations[0] as Value).run(stack);
  }
  for (let i = validOperations.length - 1; i >= 0; i--) {
    const operation = validOperations[i];
    for (let j = 1; j < operations.length; j += 2) {
      if (operations[j] == operation) {
        const left = operations.slice(0, j);
        const right = operations.slice(j + 1, operations.length);
        const leftVal: any = runOperations(left, stack);
        const rightVal: any = runOperations(right, stack);
        switch (operation) {
          case "+":
            return leftVal + rightVal;
          case "-":
            return leftVal - rightVal;
          case "*":
            return leftVal * rightVal;
          case "**":
            return leftVal ** rightVal;
          case "/":
            return leftVal / rightVal;
          case "%":
            return leftVal % rightVal;
          case ">":
            return leftVal > rightVal;
          case "<":
            return leftVal < rightVal;
          case ">=":
            return leftVal >= rightVal;
          case "<=":
            return leftVal <= rightVal;
          case "==":
            return leftVal == rightVal;
          case "!=":
            return leftVal != rightVal;
          case "&&":
            return leftVal && rightVal;
          case "||":
            return leftVal || rightVal;
        }
      }
    }
  }
}
