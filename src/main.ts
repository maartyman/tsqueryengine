import {iteratorHashJoin} from "./iteratorModel/iteratorModel";
import {pubConsAsyncModel} from "./pubConsAsyncModel/pubConsAsyncModel";
import {pubConsCallbackModel} from "./pubConsCallbackModel/pubConsCallbackModel";
import {pubConsWorkerThreadsModel} from "./pubConsWorkerTreadsModel/pubConsWorkerThreadsModel";
import {sleep} from "./utils/sleep";

let arrayHasLocation = new Array<object>();
arrayHasLocation.push({x: "s1", y: "l1"});
arrayHasLocation.push({x: "s2", y: "l2"});
arrayHasLocation.push({x: "s3", y: "l2"});
arrayHasLocation.push({x: "s3", y: "l3"});
arrayHasLocation.push({x: "s3", y: "l3"});
arrayHasLocation.push({x: "s5", y: "l3"});
arrayHasLocation.push({x: "s10", y: "l10"});

let arrayHasName = new Array<object>();
arrayHasName.push({y: "l1", z: "Kitchen"});
arrayHasName.push({y: "l2", z: "Outside"});
arrayHasName.push({y: "l2", z: "Patio"});
arrayHasName.push({y: "l2", z: "Deck"});
arrayHasName.push({y: "l3", z: "Deck"});
arrayHasName.push({y: "l4", z: "Unused"});
arrayHasName.push({y: "l10", z: "Living"});

let arrayASensor = new Array<object>();
arrayASensor.push({x: "s1"});
arrayASensor.push({x: "s2"});
arrayASensor.push({x: "s3"});
arrayASensor.push({x: "s4"});
arrayASensor.push({x: "s5"});
arrayASensor.push({x: "s10"});

//console.log(iteratorHashJoin(arrayHasLocation, arrayHasName, arrayASensor));


const model1 = new pubConsWorkerThreadsModel();


/*
const time1 = performance.now();
let rand;
for (let i = 0; i < 10000; i++) {
  rand = Math.floor(Math.random()*3);
  switch (rand) {
    case 0:
      model1.pushHasLocationBinding({
        x: `s${Math.floor(Math.random() * 100)}`,
        y: `l${Math.floor(Math.random() * 100)}`
      });
      break;
    case 1:
      model1.pushHasNameBinding({y: `l${Math.floor(Math.random() * 100)}`, z: "Kitchen"});
      break;
    case 2:
      model1.pushASensorBinding({x: `s${Math.floor(Math.random() * 100)}`});
      break;
  }
}
*/

/*
setInterval(() => {
    const time2 = performance.now();
    console.log(model1.outputNumber);
    console.log("time: ", time2-time1);
}, 1000);
*/


/*
model1.pushHasLocationBinding(arrayHasLocation[0], true);
model1.pushHasNameBinding(arrayHasName[0], true);
model1.pushASensorBinding(arrayASensor[0], true);

model1.pushHasLocationBinding(arrayHasLocation[1], true);
model1.pushHasNameBinding(arrayHasName[1], true);
model1.pushASensorBinding(arrayASensor[1], true);

model1.pushHasLocationBinding(arrayHasLocation[2], true);
model1.pushHasNameBinding(arrayHasName[2], true);
//console.log(performance.now());
model1.pushASensorBinding(arrayASensor[2], true);



sleep(1000).then( () => {
  model1.pushASensorBinding(arrayASensor[2], false);
  model1.pushASensorBinding(arrayASensor[1], false);
  model1.pushASensorBinding(arrayASensor[0], false);
});
*/

model1.pushHasNameBinding({y: "l1", z: "Kitchen"});
model1.pushHasNameBinding({y: "l2", z: "Living"});
model1.pushHasNameBinding({y: "l3", z: "Sleeping-room"});

sleep(1000).then( () => {
  model1.pushASensorBinding({x: "s1"}, true);
  model1.pushHasLocationBinding({x: "s1", y: "l1"}, true);

  model1.pushASensorBinding({x: "s2"}, true);
  model1.pushHasLocationBinding({x: "s2", y: "l1"}, true);

  model1.pushASensorBinding({x: "s3"}, true);
  model1.pushHasLocationBinding({x: "s3", y: "l2"}, true);

  model1.pushASensorBinding({x: "s4"}, true);
  model1.pushHasLocationBinding({x: "s4", y: "l3"}, true);

  sleep(1000).then( () => {
    model1.pushASensorBinding({x: "s1"}, false);
    model1.pushHasLocationBinding({x: "s1", y: "l1"}, false);

    model1.pushHasLocationBinding({x: "s2", y: "l1"}, false);
    model1.pushHasLocationBinding({x: "s2", y: "l2"}, true);

    model1.pushASensorBinding({x: "s3"}, false);
    model1.pushHasLocationBinding({x: "s3", y: "l2"}, false);

    model1.pushASensorBinding({x: "s4"}, false);
    model1.pushHasLocationBinding({x: "s4", y: "l3"}, false);
  });
});


/*
console.log("\nnext:\n");
const model2 = new pubConsAsyncModel();

model2.pushHasLocationBinding([arrayHasLocation[0]]);
model2.pushHasNameBinding([arrayHasName[0]]);
model2.pushASensorBinding([arrayASensor[0]]);

model2.pushHasLocationBinding([arrayHasLocation[1]]);
model2.pushHasNameBinding([arrayHasName[1]]);
model2.pushASensorBinding([arrayASensor[1]]);

model2.pushASensorBinding([arrayASensor[2]]);

console.log("\nnext:\n");
const model3 = new pubConsWorkerThreadsModel();

model3.pushHasLocationBinding([arrayHasLocation[0]]);
model3.pushHasNameBinding([arrayHasName[0]]);
model3.pushASensorBinding([arrayASensor[0]]);

model3.pushHasLocationBinding([arrayHasLocation[1]]);
model3.pushHasNameBinding([arrayHasName[1]]);
model3.pushASensorBinding([arrayASensor[1]]);

model3.pushASensorBinding([arrayASensor[2]]);

*/

