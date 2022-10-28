import {mergeJoin} from "./innerJoin/mergeJoin";
import {Relation} from "../relation/relation";
import {nestedLoopJoin} from "./innerJoin/nestedLoopJoin";
import {hashJoin} from "./innerJoin/hashJoin";
import {ArrayIterator, Iiterator} from "./iterator/arrayIterator";
import {BindingDiff} from "../types/types";

export function iteratorMergeJoin(
  arrayHasLocation: Array<any>,
  arrayHasName: Array<any>,
  arrayASensor: Array<any>
) {
  return mergeJoin(
    mergeJoin(
      new Relation(arrayHasLocation),
      new Relation(arrayHasName),
      "y"
    )
    ,
    new Relation(arrayASensor),
    "x"
  );
}

export function iteratorNestedLoopJoin(
  arrayHasLocation: Array<any>,
  arrayHasName: Array<any>,
  arrayASensor: Array<any>
) {
  return nestedLoopJoin(
    nestedLoopJoin(
      new Relation(arrayHasLocation),
      new Relation(arrayHasName),
      "y"
    )
    ,
    new Relation(arrayASensor),
    "x"
  );
}

export function iteratorHashJoin(
  arrayHasLocation: Array<BindingDiff>,
  arrayHasName: Array<BindingDiff>,
  arrayASensor: Array<BindingDiff>
) {
  const arrayHasLocationIterator = new ArrayIterator(arrayHasLocation, "hasLocation");
  const arrayHasNameIterator = new ArrayIterator(arrayHasName, "hasName");
  const arrayASensorIterator = new ArrayIterator(arrayASensor, "aSensor");

  const join1 = new hashJoin(arrayHasLocationIterator, arrayHasNameIterator,"y");
  const join2 = new hashJoin(join1, arrayASensorIterator, "x");

  printPuller(join2);
}

async function printPuller(iterator: Iiterator) {
  while(true) {
    let hasNext = await iterator.hasNext();
    if (!hasNext) {
      break;
    }
    console.log("---------------------------------------------------------------------------------------------------------");
    console.log("new binding: ", iterator.next());
    console.log("---------------------------------------------------------------------------------------------------------");
  }
}
