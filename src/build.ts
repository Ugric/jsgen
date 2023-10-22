import Value from "./value";
import Multi from "./multi";

export default function render(...values: Value[]): string {
  return new Multi(...values).build();
}