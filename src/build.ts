import Value from "./value";
import Multi from "./multi";

export default function build(...values: Value[]): string {
  return new Multi(...values).build();
}