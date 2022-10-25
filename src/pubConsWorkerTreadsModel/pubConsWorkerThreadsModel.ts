import {Worker} from "node:worker_threads";

export class pubConsWorkerThreadsModel {
  private join1;
  private join2;

  constructor() {
    this.join1 = new Worker(
      "./src/pubConsWorkerTreadsModel/innerJoin/hashJoin.js",
      {
        workerData: "y"
      }
    );
    this.join2 = new Worker("./src/pubConsWorkerTreadsModel/innerJoin/hashJoin.js",
      {
        workerData: "x"
      }
    );

    this.join1.on("message", (outputDiff) => {
      console.log("join1 Output: ");
      console.log(outputDiff);
      this.join2.postMessage([0, outputDiff]);
    });

    this.join2.on("message", (outputDiff) => {
      console.log("join2 Output: ");
      console.log(outputDiff);
    });
  }

  public pushHasLocationBinding(bindings: object[]) {
    console.log("Added the following bindings: ", bindings);
    this.join1.postMessage([0, bindings]);
  }

  public pushHasNameBinding(bindings: object[]) {
    console.log("Added the following bindings: ", bindings);
    this.join1.postMessage([1, bindings]);
  }

  public pushASensorBinding(bindings: object[]) {
    console.log("Added the following bindings: ", bindings);
    this.join2.postMessage([1, bindings]);
  }
}
