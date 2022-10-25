const { parentPort, workerData } = require('node:worker_threads');

const leftMap = new Map<string, Array<object>>();
const rightMap = new Map<string, Array<object>>();

const a = workerData;

//[1, outputDiff]
parentPort.on('message', (message: [number, object[]]) => {
  console.log("message", message);

  switch (message[0]) {
    case 0:
      join(leftMap, rightMap, message[1], a);
      break;
    case 1:
      join(rightMap, leftMap, message[1], a);
      break;
    default:
      break;
  }
});

async function join(changeMap: Map<string, Array<object>>, staticMap: Map<string, Array<object>>, diff: object[], a: string) {
  //TODO assert diff has a
  //TODO only assuming positive diff right now

  async function sleep(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  //await sleep(Math.random()*100);

  console.log("Doing diff: ", diff);

  let outputDiff: object[] = [];
  diff.forEach((diffElement) => {
    // @ts-ignore
    const rightElementArray = changeMap.get(diffElement[a]);
    if (rightElementArray) {
      rightElementArray.push(diffElement);
    }
    else {
      // @ts-ignore
      changeMap.set(diffElement[a], [diffElement]);
    }

    // @ts-ignore
    const leftElementArray = staticMap.get(diffElement[a]);
    if (leftElementArray) {
      for (const leftElement of leftElementArray) {
        let obj: Record<string, any> = {};
        for (const [key, value] of Object.entries(leftElement)) {
          obj[key] = value;
        }
        for (const [key, value] of Object.entries(diffElement)) {
          if (key !== a) {
            obj[key] = value;
          }
        }
        outputDiff.push(obj);
      }
    }
  });
  if (outputDiff.length != 0) {
    parentPort.postMessage(outputDiff);
  }
}
