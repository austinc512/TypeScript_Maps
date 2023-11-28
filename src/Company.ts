import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap';

export class Company implements Mappable {
  // companyName
  // catchPhrase
  // location: lat, lng
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };
  // implements keyword helped us find the source of the issue
  color!: 'red';

  constructor() {
    this.companyName = faker.company.name();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: faker.location.latitude({ min: -75, max: 75 }),
      lng: faker.location.longitude({ min: -75, max: 75 }),
    };
    console.log(this);
  }
  markerContent(): string {
    return `<div>
    <h2>Company Name: ${this.companyName}</h2>
    <h3>Catchphrase: ${this.catchPhrase}</h3>
    </div>`;
  }
}
