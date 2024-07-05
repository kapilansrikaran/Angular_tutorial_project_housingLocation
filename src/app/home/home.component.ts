import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" name="" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResult(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation] ="housingLocation"/>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //add new property call housingLocationList
  housingLocationList: HousingLocation[] = [ ];
  housingService: HousingService = inject(HousingService);

  filteredLocationList: HousingLocation[] = [];


  constructor(){
    // old one
    // this.housingLocationList = this.housingService.getAllHousingLocations();
    // updated calls
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      
      this.filteredLocationList = housingLocationList;
  });

  }

  // this allows users to clear the search box and receive all housing locations.
  filterResult(text: string){
    if(!text) this.filteredLocationList = this.housingLocationList;
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

}
