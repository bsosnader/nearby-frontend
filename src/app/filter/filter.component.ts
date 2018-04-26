import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})


export class FilterComponent implements OnInit {
  cat_str: string = '';
  @Output() onFiltered = new EventEmitter<string>();
  constructor() { }
  model =
  {
    Athletics:false,
    Clubs:false,
    Varsity:false,
    Football:false,
    Soccer:false,
    Hockey:false,
    Volleyball:false,
    Basketball:false,
    Food:false,
    Pizza:false,
    Dessert:false,
    Vegan:false,
    Vegetarian:false,
    Animals:false,
    Dogs:false,
    Cats:false,
    Fundraising:false,
    Charity: false,
    Club: false,
    Nonprofit: false,
    Professional:false,
    Information:false,
    Career_Fair:false,
    Development:false,
    Resume_Review:false,
    Interview_Prep:false,
    Music: false,
    Concerts: false,
    Street_Performance: false,
    Alternative: false,
    Classic: false,
    Rock: false,
    Pop: false,
    Hip_Hop_Rap: false
  }

  ngOnInit() {
  }

  doFilter() {

    for (let key in this.model) {
        if(this.model[key]) {
          if(key == "Hip_Hop_Rap") {
            this.cat_str += ',' + 'Hip-Hop/Rap';
          } else {
            this.cat_str += ',' + key.split("_").join(" ");
          }
        }
    }
    this.cat_str = this.cat_str.substring(1,this.cat_str.length)
    console.log(this.cat_str)
    this.onFiltered.emit(this.cat_str);
    this.cat_str = '';

  }

}
