
export type scope = Record<string, storedValue>;
export type scopeStack = scope[];


export class storedValue {
  public value: any;
  public storedType: "const" | "let" | "var";
  constructor(value: any, storedType: "const" | "let" | "var") {
    this.value = value;
    this.storedType = storedType;
  }
}

export default class Value {
  public line:boolean = false;
  public build(): string {
    throw new Error("Not implemented");
  }
  public run(stack: scopeStack): any {
    throw new Error("Not implemented");
  }
}
