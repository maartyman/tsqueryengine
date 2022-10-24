import {Relation} from "../relation/relation";

export function mergeJoin(left: Relation, right: Relation, a: string) {
  const output = new Relation();

  //sort (maybe todo)
  left.sort(a);
  right.sort(a);

  let leftSingle: any;
  let leftSubset: any[];
  let leftPosition = 0;
  [leftSingle, leftSubset, leftPosition] = advance(left, a, leftPosition);

  let rightSingle: any;
  let rightSubset: any[];
  let rightPosition = 0;
  [rightSingle, rightSubset, rightPosition] = advance(right, a, rightPosition);

  while (leftSubset.length != 0 && rightSubset.length != 0) {
    //console.log(JSON.stringify(leftSingle) + " => " + JSON.stringify(rightSingle));
    if (leftSingle[a] === rightSingle[a]) {
      //add cartesian product of left_subset and right_subset to output
      rightSubset.forEach((rightElement) => {
        leftSubset.forEach((leftElement) => {
          let obj: Record<string, any> = {};
          for (const [key, value] of Object.entries(leftElement)) {
            obj[key] = value;
          }
          for (const [key, value] of Object.entries(rightElement)) {
            if (key !== a) {
              obj[key] = value;
            }
          }
          //console.log(obj);
          output.add(obj);
        });
      });

      [leftSingle, leftSubset, leftPosition] = advance(left, a, leftPosition);
      [rightSingle, rightSubset, rightPosition] = advance(right, a, rightPosition);
    }
    else if (leftSingle[a] < rightSingle[a]) {
      [leftSingle, leftSubset, leftPosition] = advance(left, a, leftPosition);
    }
    else {
      [rightSingle, rightSubset, rightPosition] = advance(right, a, rightPosition);
    }
  }
  return output;
}

function advance(sorted: Relation, a: string, position: number) {
  const single = sorted.get(position);
  let subset = [];
  while (position < sorted.size() && sorted.get(position)[a] === single[a]) {
    subset.push(sorted.get(position))
    position++;
  }
  //console.log(single, subset, position);
  return [single, subset, position];
}

//function sort()
