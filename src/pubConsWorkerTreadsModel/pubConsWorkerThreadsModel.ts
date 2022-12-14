import {Worker, MessageChannel, MessagePort} from "node:worker_threads";

export class pubConsWorkerThreadsModel {
  private join1;
  private join2;
  public outputNumber = 0;
  private channelJoin1Left = new MessageChannel();
  private channelJoin1Right = new MessageChannel();
  private channelJoin2Left = new MessageChannel();
  private channelJoin2Right = new MessageChannel();
  private channelOutput = new MessageChannel();

  private channels: MessageChannel[] = [];
  private workers: Worker[] = [];

  constructor(queryPlan: object) {
    let messageChannel = new MessageChannel();

    this.join1 = new Worker(
      "./src/pubConsWorkerTreadsModel/innerJoin/hashJoin.js",
      {
        transferList: [
          this.channelJoin1Left.port2,
          this.channelJoin1Right.port2,
          this.channelJoin2Left.port1,
        ],
        workerData: [
          "y",
          [
            this.channelJoin1Left.port2,
            this.channelJoin1Right.port2
          ],
          this.channelJoin2Left.port1,
          "join1"
        ]
      }
    );
    this.join2 = new Worker("./src/pubConsWorkerTreadsModel/innerJoin/hashJoin.js",
      {
        transferList: [
          this.channelJoin2Left.port2,
          this.channelJoin2Right.port2,
          this.channelOutput.port1
        ],
        workerData: [
          "x",
          [
            this.channelJoin2Left.port2,
            this.channelJoin2Right.port2
          ],
          this.channelOutput.port1,
          "join2"
        ]
      }
    );

    this.channelOutput.port2.on("message", (outputDiff) => {
      //console.log("join2 Output: ");
      console.log(outputDiff);
      this.outputNumber++;
      if(this.outputNumber == 3) {
        //console.log(performance.now());
      }
    });
  }

  /*
  private queryPlanInit(queryPlan: any): MessagePort {
    switch (queryPlan.type) {
      case "print":
        const inputMessagePort = this.queryPlanInit(queryPlan.option.inpu);

        const outputMessageChannel = new MessageChannel();
        this.channels.push(outputMessageChannel);

        this.workers.push(new Worker("./src/pubConsWorkerTreadsModel/innerJoin/print.js",
          {
            transferList: [
              inputMessagePort,
              outputMessageChannel.port1
            ],
            workerData: [
              inputMessagePort,
              outputMessageChannel.port1,
              "Print worker"
            ]
          }
        ));

        return outputMessageChannel.port2;
      case "join":

        break;
    }
  }
  */

  public pushHasLocationBinding(binding: object, addition?: boolean) {
    console.log(`${addition? "Added": "Removed"} the following bindings: `, binding);
    this.channelJoin1Left.port1.postMessage({addition: (addition == undefined)? true : addition, data: binding});
  }

  public pushHasNameBinding(binding: object, addition?: boolean) {
    console.log(`${addition? "Added": "Removed"} the following bindings: `, binding);
    this.channelJoin1Right.port1.postMessage({addition: (addition == undefined)? true : addition, data: binding});
  }

  public pushASensorBinding(binding: object, addition?: boolean) {
    console.log(`${addition? "Added": "Removed"} the following bindings: `, binding);
    this.channelJoin2Right.port1.postMessage({addition: (addition == undefined)? true : addition, data: binding});
  }
}
