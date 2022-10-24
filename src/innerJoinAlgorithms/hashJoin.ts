import {Relation} from "../relation/relation";

export function hashJoin(left: Relation, right: Relation, a: string) {
  const output = new Relation();

  //make sure left is the smallest
  if (left.size() > right.size()) {
    const temp = left;
    left = right;
    right = temp;
  }

  // turn left into hash
  let map = new Map<string, Array<any>>();
  left.forEach((leftElement) => {
    const leftElementArray = map.get(leftElement[a]);
    if (leftElementArray) {
      leftElementArray.push(leftElement);
    }
    else {
      map.set(leftElement[a], [leftElement]);
    }
  });

  right.forEach((rightElement) => {
    const leftElementArray = map.get(rightElement[a]);
    if (leftElementArray) {
      for (const leftElement of leftElementArray) {
        let obj: Record<string, any> = {};
        for (const [key, value] of Object.entries(leftElement)) {
          obj[key] = value;
        }
        for (const [key, value] of Object.entries(rightElement)) {
          if (key !== a) {
            obj[key] = value;
          }
        }
        output.add(obj);
      }
    }
  });

  return output;
}
