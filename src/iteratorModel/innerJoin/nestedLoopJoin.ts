import {Relation} from "../../relation/relation";

export function nestedLoopJoin(left: Relation, right: Relation, a: string) {
  const output = new Relation();
  left.forEach((leftElement) => {
    right.forEach((rightElement) => {
      if (leftElement[a] == rightElement[a]) {
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
    });
  });
  return output;
}
