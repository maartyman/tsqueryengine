import {iteratorHashJoin} from "./iteratorModel/iteratorModel";
import {pubConsAsyncModel} from "./pubConsAsyncModel/pubConsAsyncModel";
import {pubConsCallbackModel} from "./pubConsCallbackModel/pubConsCallbackModel";
import {pubConsWorkerThreadsModel} from "./pubConsWorkerTreadsModel/pubConsWorkerThreadsModel";

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

const model1 = new pubConsCallbackModel();

model1.pushHasLocationBinding([arrayHasLocation[0]]);
model1.pushHasNameBinding([arrayHasName[0]]);
model1.pushASensorBinding([arrayASensor[0]]);

model1.pushHasLocationBinding([arrayHasLocation[1]]);
model1.pushHasNameBinding([arrayHasName[1]]);
model1.pushASensorBinding([arrayASensor[1]]);

model1.pushASensorBinding([arrayASensor[2]]);

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
*/

console.log("\nnext:\n");
const model3 = new pubConsWorkerThreadsModel();

model3.pushHasLocationBinding([arrayHasLocation[0]]);
model3.pushHasNameBinding([arrayHasName[0]]);
model3.pushASensorBinding([arrayASensor[0]]);

model3.pushHasLocationBinding([arrayHasLocation[1]]);
model3.pushHasNameBinding([arrayHasName[1]]);
model3.pushASensorBinding([arrayASensor[1]]);

model3.pushASensorBinding([arrayASensor[2]]);

