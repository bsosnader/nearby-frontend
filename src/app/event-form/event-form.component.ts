import { Component, OnInit } from '@angular/core';
import { newEvent } from './newEvent.interface'
import { EventService } from '../event.service';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



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
                    lng:'',
                    zipcode:'',
                    user_email: JSON.parse(localStorage.getItem('id_token')).username,
                    start_time: null,
                    end_time: null,
                    categories: 'All'.split(',')};

  constructor(private eventService: EventService, private router: Router, public modal: NgbActiveModal) { }

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
          this.model.lat = String(loc.results[0].geometry.location.lat).substring(0,10);
          this.model.lng = String(loc.results[0].geometry.location.lng).substring(0,10);
          for(let comp of loc.results[0].address_components) {
            for(let type of comp.types) {
              if(type == "postal_code") {
                this.model.zipcode = comp.long_name;
              }
            }
          }
          // will do event post here
          this.eventService.postEvent(this.model, JSON.parse(localStorage.getItem('id_token')).token)
            .subscribe(res => {
              console.log(res)
              this.router.navigate(['event', res.id]);
              this.modal.close();
            }, error => {
              console.error(error)
            })
        } else {
          this.badAddress = true;
        }
      });
  }

  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;
    let date = new Date();
    if (!value) {
      return null;
    }

    if (value.hour < date.getHours()) {
      return {tooEarly: true};
    }
    if (value.hour == date.getHours() && value.minute < date.getMinutes()) {
      return {tooEarly: true}
    }

    return null;
  });
  ctrl2 = new FormControl('', (control: FormControl) => {
    const value = control.value;
    let date = new Date();
    if (!value) {
      return null;
    }

    if (this.start_time && control.value.hour < this.start_time.hour) {
      return {tooEarly: true};
    }
    if (this.start_time && control.value.minute < this.start_time.minute) {
      return {tooEarly: true}
    }

    return null;
  });
  // TODO remove after testing
  get diagnostic() {
    return JSON.stringify(this.model); }

}
