export class Relation {
  private readonly array: Array<object> ;

  constructor(array?: Array<object>) {
    this.array = (array == undefined)? new Array<object>() : array;
  }

  public get(index: number) {
    return this.array[index]
  }

  public sort(a: string) {
    this.array.sort((el1, el2) => {
      // @ts-ignore
      if (el1[a] > el2[a]) {
        return 1;
      }
      // @ts-ignore
      if (el2[a] > el1[a]) {
        return -1;
      }
      return 0;
    });
  }

  public size() {
    return this.array.length
  }

  public add(element: any)
  {
    this.array.push(element);
  }

  public forEach(callbackfn: (value: any, index: number, array: any[]) => void) {
    this.array.forEach(callbackfn);
  }
}
