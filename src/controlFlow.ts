import Value, { scopeStack } from "./value";

export class Return extends Value {
  public line = true;
  constructor(private value: Value) {
    super();
  }
  public build(): string {
    if (this.value.line) throw new Error("Cannot return a line");
    return `return ${this.value.build()}`;
  }
  public run(stack: scopeStack) {
    return new controlFlow("return", this.value.run(stack));
  }
}

export class Break extends Value {
  public line = true;
  public build(): string {
    return "break";
  }
  public run() {
    return new controlFlow("Break");
  }
}
export class Continue extends Value {
  public line = true;
  public build(): string {
    return "continue";
  }
  public run() {
    return new controlFlow("Continue");
  }
}

export class controlFlow {
  constructor(
    public type: "return" | "Break" | "Continue",
    public value?: any
  ) {}
}

export function unControlFlower(value: any) {
  if (value instanceof controlFlow) return value.value;
}
