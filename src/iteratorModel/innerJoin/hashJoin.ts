import {Iiterator} from "../iterator/arrayIterator";
import {BindingDiff} from "../../types/types";
import {sleep} from "../../utils/sleep";

export class hashJoin implements Iiterator {
  private left: Iiterator;
  private right: Iiterator;
  private a: string;

  private leftMap = new Map<string, Map<string, object>>;
  private rightMap = new Map<string, Map<string, object>>;

  private outputBindings: BindingDiff[] = [];
  private noHasNextL = false;
  private noHasNextR = false;

  constructor(left: Iiterator, right: Iiterator, a: string) {
    this.left = left;
    this.right = right;
    this.a = a;
  }


  next(): BindingDiff | undefined {
    return this.outputBindings.pop();
  }

  async hasNext(): Promise<boolean> {
    if (this.outputBindings.length > 0) {
      return true;
    }
    else {
      return new Promise(async (resolve, reject) => {
        this.getL(resolve, reject);
        this.getR(resolve, reject);
      });
    }
  }

  private async getL(resolve: (value: (boolean | PromiseLike<boolean>)) => void, reject: (reason?: any) => void) {
    while (true) {
      let hasNext = await this.left.hasNext();

      if(!hasNext) {
        this.noHasNextL = true;
        if (this.noHasNextR) {
          resolve(false);
        }
        return;
      }

      if(this.outputBindings.length == 0) {
        // @ts-ignore
        const outputDiff = this.join(this.leftMap, this.rightMap, this.left.next());
        if (outputDiff.length == 0) {
          continue;
        }
        for (const bindingDiff of outputDiff) {
          this.outputBindings.push(bindingDiff);
        }
        resolve(true);
        return;
      }
      else {
        resolve(true);
        return;
      }
    }
  }

  private async getR(resolve: (value: (boolean | PromiseLike<boolean>)) => void, reject: (reason?: any) => void) {
    while (true) {
      let hasNext = await this.right.hasNext();

      if(!hasNext) {
        this.noHasNextR = true;
        if (this.noHasNextL) {
          resolve(false);
        }
        return;
      }

      if(this.outputBindings.length == 0) {
        // @ts-ignore
        const outputDiff = this.join(this.rightMap, this.leftMap, this.right.next());
        if (outputDiff.length == 0) {
          continue;
        }
        for (const bindingDiff of outputDiff) {
          this.outputBindings.push(bindingDiff);
        }
        resolve(true);
        return;
      }
      else {
        resolve(true);
        return;
      }
    }
  }

  private join(changeMap: Map<string, Map<string, object>>, staticMap: Map<string, Map<string, object>>, diff: BindingDiff): BindingDiff[] {

    if (!diff) {
      return [];
    }
    console.log("diff: ", diff);
    //console.log("changemap, staticmap: ", changeMap, staticMap);

    if (diff.addition) {
      // @ts-ignore
      let changeElementMap = changeMap.get(diff.data[this.a]);
      if (!changeElementMap) {
        changeElementMap = new Map();
        // @ts-ignore
        changeMap.set(diff.data[this.a], changeElementMap);
      }
      changeElementMap.set(JSON.stringify(diff.data), diff.data);

      // @ts-ignore
      const staticElementMap = staticMap.get(diff.data[this.a]);
      if (staticElementMap != undefined) {
        let output: BindingDiff[] = [];
        for (const staticElement of staticElementMap.values()) {
          let obj: Record<string, any> = {};
          for (const [key, value] of Object.entries(staticElement)) {
            obj[key] = value;
          }
          for (const [key, value] of Object.entries(diff.data)) {
            if (key !== this.a) {
              obj[key] = value;
            }
          }
          output.push({addition: true, data: obj});
        }
        return output;
      }
      else {
        return [];
      }
    }
    else {
      // @ts-ignore
      let changeElementMap = changeMap.get(diff.data[this.a]);
      if (changeElementMap) {
        changeElementMap.delete(JSON.stringify(diff.data));
        if (changeElementMap.size == 0) {
          // @ts-ignore
          changeMap.delete(diff.data[this.a]);
        }
      }
      else {
        return [];
      }

      // @ts-ignore
      const staticElementMap = staticMap.get(diff.data[this.a]);
      if (staticElementMap != undefined) {
        let output: BindingDiff[] = [];
        for (const staticElement of staticElementMap.values()) {
          let obj: Record<string, any> = {};
          for (const [key, value] of Object.entries(staticElement)) {
            obj[key] = value;
          }
          for (const [key, value] of Object.entries(diff.data)) {
            if (key !== this.a) {
              obj[key] = value;
            }
          }
          output.push({addition: false, data: obj});
        }
        return output;
      }
      else {
        return [];
      }
    }
  }
}




















/*
    ()  {
  const output = new Relation();

  //make sure left is the smallest


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
*/
