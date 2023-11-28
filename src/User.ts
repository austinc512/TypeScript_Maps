import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap';

export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  // implements keyword helped us find the source of the issue
  color!: 'red';

  constructor() {
    this.name = faker.person.firstName();
    // console.log(this.location); // would be null or undefined
    this.location = {
      lat: faker.location.latitude({ min: -75, max: 75 }),
      lng: faker.location.longitude({ min: -75, max: 75 }),
    };
    console.log(this);
  }
  getCoords(): void {
    console.log(this.location.lat);
    console.log(this.location.lng);
  }
  markerContent(): string {
    return `<h2>User: ${this.name}</h2>`;
  }
}
