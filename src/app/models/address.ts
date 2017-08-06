import {Geo} from './geo';

export class Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;

  constructor(data) {
    this.street = data.street;
    this.suite = data.suite;
    this.city = data.city;
    this.zipcode = data.zipcode;
    this.geo = new Geo(data.geo);
  }
}
