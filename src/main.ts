import {iteratorHashJoin} from "./iteratorModel/iteratorModel";
import {pubConsModel} from "./pubConsCallbackModel/pubConsModel";

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

const model = new pubConsModel();

model.pushHasLocationBinding([arrayHasLocation[0]]);
model.pushHasNameBinding([arrayHasName[0]]);
model.pushASensorBinding([arrayASensor[0]]);

model.pushHasLocationBinding([arrayHasLocation[1]]);
model.pushHasNameBinding([arrayHasName[1]]);
model.pushASensorBinding([arrayASensor[1]]);

model.pushASensorBinding([arrayASensor[2]]);
