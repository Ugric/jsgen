import Value, { scope, storedValue } from "./value";
import Multi from "./multi";
import { controlFlow } from "./controlFlow";

const topScope: scope = {
    "console": new storedValue({
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info,
        debug: console.debug,
    }, "var"),
};

export default function run(...values: Value[]) {
  const val = new Multi(...values).run([{...topScope},{}]);
  if (val instanceof controlFlow) {
    throw new Error(`Cannot ${val.type} at top level`);
  }
  return val;
}
