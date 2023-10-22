import Any from "./Any";
import ArrowFunction from "./arrowFunction";
import Assign from "./assign";
import build from "./build";
import operGen from "./operation";
import run from "./run";
import Value from "./value";
import Var from "./var";

const body: Value[] = [
  new Assign(null, "add",new ArrowFunction(["a", "b"], operGen`${new Var("a")} + ${new Var("b")} * ${new Var("a")}`)),
];
console.log(build(...body));
console.log(run(...body)(1,2));
