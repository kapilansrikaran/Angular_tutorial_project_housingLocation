import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `

      <!-- details works! {{ housingLocation?.id }} -->
       <article>
          <!-- housingLocation could be undefined, we'll use the optional chaining operator  -->
          <img class="listing-photo" [src]="housingLocation?.photo">
          <section class="listing-desciption">
            <h2 class="listing-heading">{{ housingLocation?.name}}</h2>
            <p  class="listing-location"> {{ housingLocation?.city}}, {{housingLocation?.state}} </p>
          </section>
          <section class="listing-features">
            <h2 class="section-heading">About this housing location</h2>
            <ul>
              <li>Units avabile: {{housingLocation?.availableUnits}}</li>
              <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
              <li>Does this location have lanudry: {{housingLocation?.laundry}}</li>
            </ul>
          </section>
          <section class="listing-apply">
            <h2 class="section-heading">Apply now to live here</h2>
            <button class="primary" type="button">Apply now</button>
          </section>
       </article>
  
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  // ActavatedRoute is a reference to the curent Routes we are matched
  route: ActivatedRoute = inject(ActivatedRoute);

  //property
  // housingLocationId = 0;

  //reference to the service by adding a property tp the component class
  housingService = inject(HousingService);

  housingLocation: HousingLocation | undefined;

  // methed that accepts no parameters named constroctor
  constructor(){
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }
}
