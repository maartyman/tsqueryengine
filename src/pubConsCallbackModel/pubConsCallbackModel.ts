import {hashJoin} from "./innerJoin/hashJoin";

export class pubConsCallbackModel {
  private join1 = new hashJoin();
  private join2 = new hashJoin();
  public output = [];

  constructor() {
    this.join1.on("output", (output) => {
      //console.log("join1 Output: ");
      //console.log(output);
      this.join2.joinL("x", output);
    });

    this.join2.on("output", (output) => {
      console.log("join2 Output: ");
      console.log(output);
      this.output = this.output.concat(output);
    })
  }

  public pushHasLocationBinding(bindings: object, addition: boolean) {
    //console.log("Added the following bindings: ", bindings);
    this.join1.joinL("y", [bindings]);
  }

  public pushHasNameBinding(bindings: object, addition: boolean) {
    //console.log("Added the following bindings: ", bindings);
    this.join1.joinR("y", [bindings]);
  }

  public pushASensorBinding(bindings: object, addition: boolean) {
    //console.log("Added the following bindings: ", bindings);
    this.join2.joinR("x", [bindings]);
  }
}
