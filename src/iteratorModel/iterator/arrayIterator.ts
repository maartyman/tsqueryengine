import {sleep} from "../../utils/sleep";
import {BindingDiff} from "../../types/types";

export interface Iiterator {
  next(): BindingDiff | undefined;
  hasNext(): Promise<boolean>;
}

export class ArrayIterator implements Iiterator {
  private readonly array: BindingDiff[];

  private name;

  constructor(array: BindingDiff[], name: string) {
    this.array = array;
    this.name = name;
  }

  next(): BindingDiff | undefined {
    //console.log(this.name + " returning next: ", this.array[this.pointer]);
    return this.array.pop();
  }

  async hasNext(): Promise<boolean> {
    //console.log(this.array.length, this.pointer);
    if (this.array.length == 0) {
      if("aSensor" === this.name) {
        await sleep(10000);
        this.array.push({addition: false, data: {x: "s3"}});
        return true;
      }
      return false;
    }
    return true;
  }
}
