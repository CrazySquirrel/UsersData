export class Company {
  name: string;
  catchPhrase: string;
  bs: string;

  constructor(data) {
    this.name = data.name;
    this.catchPhrase = data.catchPhrase;
    this.bs = data.bs;
  }
}
