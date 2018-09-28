export class SelectValue {

  public title: string;

  public value: any;

  public constructor(title: string, value: any) {
    this.title = title;
    this.value = value;
  }
}

// The base class with common fields
export class Base {

  public id: number;

  public created: string;

  public modified: string;

  public created_by: string;

  public modified_by: string;

  public isEnabled: boolean = true;
}
