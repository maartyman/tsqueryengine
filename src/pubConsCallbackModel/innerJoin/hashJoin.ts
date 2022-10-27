import { EventEmitter } from 'node:events';


export class hashJoin extends EventEmitter {
  private leftMap = new Map<string, Array<object>>();
  private rightMap = new Map<string, Array<object>>();

  constructor() {
    super();
  }

  public joinR(a: string, diff: object[]) {
    this.join(this.rightMap, this.leftMap, a, diff);
  }

  public joinL(a: string, diff: object[]) {
    this.join(this.leftMap, this.rightMap, a, diff);
  }

  private join(changeMap: Map<string, Array<object>>, staticMap: Map<string, Array<object>>, a: string, diff: object[]) {
    //TODO assert diff has a
    //TODO only assuming positive diff right now

    //console.log("Doing diff: ", diff);

    let outputDiff: object[] = [];

    for (const diffElement of diff) {
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
    }

    if (outputDiff.length != 0) {
      this.emit("output", outputDiff);
    }
  }
}
