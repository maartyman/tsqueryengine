export class Relation {
  private readonly array: Array<any> ;

  constructor(array?: Array<any>) {
    this.array = (array == undefined)? new Array<any>() : array;
  }

  public get(index: number) {
    return this.array[index]
  }

  public sort(a: string) {
    this.array.sort((el1, el2) => {
      if (el1[a] > el2[a]) {
        return 1;
      }
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
