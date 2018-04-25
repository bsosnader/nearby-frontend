import { Component, OnInit } from '@angular/core';
import { newEvent } from './newEvent.interface'
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  date = new Date();
  start_time;
  end_time;
  // that date thing is hacky!
  // this entire model is hacky i mean just look at those categories, beautiful
  model: newEvent = {title:'', location:'', time: this.date.toISOString().slice(0,-1), description:'', images: null, categories:''.split(','), isPlanned: false};

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
        default: {
          break;
        }
      }
    }
    console.log(this.model);
    this.getAddr();

  }

  getFiles(event){
      this.model.images = event.target.files;
  }

  getAddr() {
    this.eventService.getLocFromAddr(this.model.location)
      .subscribe(loc => {
        console.log(loc);
        if(loc.status == "OK") {
          console.log(loc.results[0].geometry.location)
          // will do event post here
        } else {
          console.log('hello')
          this.badAddress = true;
        }
      });
  }

  // TODO remove after testing
  get diagnostic() {
    return JSON.stringify(this.model); }

}
