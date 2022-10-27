const { workerData } = require('node:worker_threads');

const leftMap = new Map<string, Map<string, object>>();
const rightMap = new Map<string, Map<string, object>>();

const a = workerData[0];
const inPortLeft = workerData[1][0];
const inPortRight = workerData[1][1];
const outPort = workerData[2];
const workerTitle =workerData[3];

let numberAddition = 0;
let time0a = 0;
let time1a = 0;
let time2a = 0;

//[1, outputDiff]
inPortLeft.on('message', (message: {addition: boolean, data: object}) => {
  //console.log(workerTitle + " message (left): ", message);
  join(leftMap, rightMap, message);
});

inPortRight.on('message', (message: {addition: boolean, data: object}) => {
  //console.log(workerTitle + " message (right): ", message);
  join(rightMap, leftMap, message);
});

async function join(changeMap: Map<string, Map<string, object>>, staticMap: Map<string, Map<string, object>>, diff: {addition: boolean, data: object}) {
  //TODO assert diff has a
  //TODO only assuming positive diff right now

  //await sleep(Math.random()*100);

  //console.log("Doing diff: ", diff);
  if (diff.addition) {
    const time0 = performance.now();
    // @ts-ignore
    let changeElementMap = changeMap.get(diff.data[a]);
    if (!changeElementMap) {
      changeElementMap = new Map();
      // @ts-ignore
      changeMap.set(diff.data[a], changeElementMap);
    }
    changeElementMap.set(JSON.stringify(diff.data), diff.data);
    const time1 = performance.now();

    let time2 = 0;
    let number = 0;

    // @ts-ignore
    const staticElementMap = staticMap.get(diff.data[a]);
    if (staticElementMap != undefined) {
      for (const staticElement of staticElementMap.values()) {
        const time2t = performance.now();
        let obj: Record<string, any> = {};
        for (const [key, value] of Object.entries(staticElement)) {
          obj[key] = value;
        }
        for (const [key, value] of Object.entries(diff.data)) {
          if (key !== a) {
            obj[key] = value;
          }
        }
        time2 += performance.now() - time2t;
        number++;
        outPort.postMessage({addition: true, data: obj});
        //console.log(workerTitle + " join output: ", {addition: true, data: obj});
      }
      time2 /= number;
    }

    const time3 = performance.now();

    time0a += time1 - time0;
    time1a += time2;
    time2a += time3 - time1;
    numberAddition++;
    if (numberAddition % 1000 == 0) {
      console.log(workerTitle, numberAddition + " time0: ", time0a/numberAddition);
      console.log(workerTitle, numberAddition + " time1: ", time1a/numberAddition);
      console.log(workerTitle, numberAddition + " time2: ", time2a/numberAddition);
    }
  }
  else {
    // @ts-ignore
    let changeElementMap = changeMap.get(diff.data[a]);
    if (changeElementMap) {
      changeElementMap.delete(JSON.stringify(diff.data));
      if (changeElementMap.size == 0) {
        // @ts-ignore
        changeMap.delete(diff.data[a]);
      }
    }
    else {
      return;
    }

    // @ts-ignore
    const staticElementMap = staticMap.get(diff.data[a]);
    if (staticElementMap != undefined) {
      for (const staticElement of staticElementMap.values()) {
        let obj: Record<string, any> = {};
        for (const [key, value] of Object.entries(staticElement)) {
          obj[key] = value;
        }
        for (const [key, value] of Object.entries(diff.data)) {
          if (key !== a) {
            obj[key] = value;
          }
        }
        outPort.postMessage({addition: false, data: obj});
        //console.log(workerTitle + " join output: ", {addition: false, data: obj});
      }
    }
  }
}
