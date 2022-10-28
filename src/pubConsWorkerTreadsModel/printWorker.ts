import {workerData, MessagePort} from "node:worker_threads";

const inPort: MessagePort = workerData[0];
const outPort: MessagePort = workerData[1];

inPortLeft.on('message', (message: string) => {
  console.log("Print worker: ", message);
  outPort.postMessage(message);
});
