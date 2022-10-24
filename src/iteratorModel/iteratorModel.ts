import {mergeJoin} from "./innerJoin/mergeJoin";
import {Relation} from "../relation/relation";
import {nestedLoopJoin} from "./innerJoin/nestedLoopJoin";
import {hashJoin} from "./innerJoin/hashJoin";

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
  arrayHasLocation: Array<object>,
  arrayHasName: Array<object>,
  arrayASensor: Array<object>
) {
  return  hashJoin(
    hashJoin(
      new Relation(arrayHasLocation),
      new Relation(arrayHasName),
      "y"
    )
    ,
    new Relation(arrayASensor),
    "x"
  );
}
