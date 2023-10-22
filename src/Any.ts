import Value, { scopeStack } from "./value";

export default class Any extends Value {
  private value: any;
  constructor(value: any) {
    super();
    this.value = value;
  }
  public build(): string {
    return JSON.stringify(this.value);
  }
  public run() {
    return this.value;
  }
}
