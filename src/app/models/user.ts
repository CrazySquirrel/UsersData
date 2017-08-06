import {Address} from './address';
import {Company} from './company';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.address = new Address(data.address);
    this.phone = data.phone;
    this.website = data.website;
    this.company = new Company(data.company);
  }
}
