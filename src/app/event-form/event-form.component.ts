import { Component, OnInit } from '@angular/core';
import { newEvent } from './newEvent.interface'
import { EventService } from '../event.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  start_time;
  end_time;
  isPlanned = false;
  address = '';
  // that date thing is hacky!
  // this entire model is hacky i mean just look at those categories, beautiful
  model: newEvent = {title:'',
                    description:'',
                    lat:'',
                    long:'',
                    zipcode:'',
                    user_email: JSON.parse(localStorage.getItem('id_token')).username,
                    comments: [],
                    upvote_count: 0,
                    start_time: '',
                    end_time: '',
                    categories: 'All'.split(',')};

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }
  submitted = false;
  badAddress = false;
  // will eventually have post request as part of this
  // TODO: also--an issue we will run into is sending as application/json when it should be multipart/form-data
  // which causes complications for django so
  // might need to switch to using ng2-file-upload for proper uploading, otherwise it'll be complicated
  onSubmit() {
    this.submitted = true;
    for(var i = 0; i < this.model.categories.length; i++) {
      switch(this.model.categories[i]) {
        case "Other Sport": {
          this.model.categories[i] = "Athletics";
          break;
        }
        case "Other Food": {
          this.model.categories[i] = "Food";
          break;
        }
        case "Other Animal": {
          this.model.categories[i] = "Animals";
          break;
        }
        case "Other Genre": {
          this.model.categories[i] = "Music";
          break;
        }
        case "Other": {
          this.model.categories[i] = "All";
        }
        default: {
          break;
        }
      }
    }
    if (this.start_time && this.end_time) {
      let start_date = new Date();
      let end_date = new Date();
      start_date.setHours(this.start_time.hour)
      start_date.setMinutes(this.start_time.minute)
      end_date.setHours(this.end_time.hour)
      end_date.setMinutes(this.end_time.minute)
      this.model.start_time = start_date.toISOString()
      this.model.end_time = end_date.toISOString()
    }
    console.log(this.model);
    this.getAddr();

  }

  getAddr() {
    this.eventService.getLocFromAddr(this.address)
      .subscribe(loc => {
        console.log(loc);
        if(loc.status == "OK") {
          console.log(loc.results[0].geometry.location)
          this.model.lat = String(loc.results[0].geometry.location.lat);
          this.model.long = String(loc.results[0].geometry.location.lng);
          for(let comp of loc.results[0].address_components) {
            for(let type of comp.types) {
              if(type == "postal_code") {
                this.model.zipcode = comp.long_name;
              }
            }
          }
          // will do event post here
        } else {
          this.badAddress = true;
        }
      });
  }

  // TODO remove after testing
  get diagnostic() {
    return JSON.stringify(this.model); }

}
