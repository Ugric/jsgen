import build from "./build";
import { Return } from "./controlFlow";
import FunctionGen from "./function";
import Operations from "./operation";
import run from "./run";
import Value from "./value";
import Var from "./var";

const body: Value[] = [
  new FunctionGen(
    "myFunc",
    ["a", "b"],
    new Return(new Operations(new Var("a"), "+", new Var("b")))
  ),
];
console.log(build(...body));
console.log(run(...body));
