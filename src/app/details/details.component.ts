import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
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
            <form [formGroup]="applyForm" (submit)="submitApplication()">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" formControlName="firstName">
           
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" formControlName="lastName">

              <label for="email">Email</label>
              <input type="email" id="email" formControlName="email">
              <button type="submit"class="primary">Apply Now</button>
            </form>
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

  // Form
  // creating instant
  applyForm = new FormGroup({
    // create property and value
    // we use this value property to access the values of the individual form controls
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
});


  // methed that accepts no parameters named constroctor
  constructor(){
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    // old one
    // this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    // updated one
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation =>{
      this.housingLocation = housingLocation;
  });
  }

  

  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
