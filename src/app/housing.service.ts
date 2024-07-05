import { Injectable } from '@angular/core';

// housingLocation Interface
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  // we are removing this housingLocationList property because we are using to get the data from local standalone server like API URL
  // property
  // protected housingLocationList: HousingLocation[] = [
  //   {
  //     id: 0,
  //     name: 'Acme Fresh Start Housing',
  //     city: 'Chicago',
  //     state: 'IL',
  //     photo: '/assets/bernard-hermant-CLKGGwIBTaY-unsplash.jpg',
  //     availableUnits: 4,
  //     wifi: true,
  //     laundry: true
  //   }
  // ];

  //This replacement of above property
  // create with url property set it to the string value as url 
  // for working start the Json server
  url ="http://localhost:3000/locations";

  // in the getAllHousinglocations function, we need to make a call to the API endpoint to retrieve this data.
  // how to do => 
  // 1. update the methode signature
  // 2. use the Fetch API to request data from the local JSON server
  // 3. all implemention of the services are updated 
  // 4. update the call to this service from the other part of the application (home.component.ts)
  // 5. updating the detail component



  constructor() { }
  
  //method name getAllHousingLocations, no parameter, return housingLocation Array
  // when inject the service that request the housingLocationList
  
  // old one
  // getAllHousingLocations() : HousingLocation[] {
  //   return this.housingLocationList;
  // }

  // updated one
  // return type is <HousingLocation[]> array
  // mark the function as async
  async getAllHousingLocations() : Promise<HousingLocation[]> {
    // using async await pattern  to reduce th amound of code
    const data = await fetch(this.url);
     // if for some reson we get a nullish value from the call to data.json,
     // so we'll default to returining an empty array.
    return await data.json() ?? [];
  }

  // It return union type of housimgLocation or Undefined
  // updated one
  async getHousingLocationById(id: Number): Promise<HousingLocation | undefined>{
    // return this.housingLocationList.find(housingLocation => housingLocation.id === id);
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  submitApplication(firstName:string, lastName:string, email:string){
    console.log(firstName, lastName, email);
  }

}
