import {hashJoin} from "./innerJoin/hashJoin";

export class pubConsAsyncModel {
  private join1;
  private join2;

  constructor() {
    this.join2 = new hashJoin((output) => {
      console.log("join2 Output: ");
      console.log(output);
    });

    this.join1 = new hashJoin((output) => {
      console.log("join1 Output: ");
      console.log(output);
      this.join2.joinL(output, "x");
    });
  }

  public pushHasLocationBinding(bindings: object[]) {
    console.log("Added the following bindings: ", bindings);
    this.join1.joinL(bindings, "y");
  }

  public pushHasNameBinding(bindings: object[]) {
    console.log("Added the following bindings: ", bindings);
    this.join1.joinR(bindings, "y");
  }

  public pushASensorBinding(bindings: object[]) {
    console.log("Added the following bindings: ", bindings);
    this.join2.joinR(bindings, "x");
  }
}
