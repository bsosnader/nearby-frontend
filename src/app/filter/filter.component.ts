import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor() { }
  model =
  {
    Athletics:false,Club:false,Varsity:false,Football:false,
    Soccer:false,Hockey:false,Volleyball:false,Basketball:false,
    Food:false, Pizza:false,Dessert:false,Vegan:false,
    Vegetarian:false,Fundraising:false,Animals:false,Dogs:false,
    Cats:false,Professional:false,Information:false,
    Career_Fair:false,Development:false,Resume_Review:false,
    Interview_Prep:false
  }

  ngOnInit() {
  }

}
