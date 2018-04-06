import { Component, OnInit } from '@angular/core';
import { newEvent } from './newEvent.interface'
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  date = new Date();

  model: newEvent = {title:'', location:'', time: '2018-04-05T12:00', description:'', images: null};

  constructor() { }

  ngOnInit() {
  }
  submitted = false;
  // will eventually have post request as part of this
  // TODO: also--an issue we will run into is sending as application/json when it should be multipart/form-data
  // which causes complications for django so
  // might need to switch to using ng2-file-upload for proper uploading, otherwise it'll be complicated
  onSubmit() {
    this.submitted = true;
    console.log(this.model);
  }

  getFiles(event){
      this.model.images = event.target.files;
  }



  // TODO remove after testing
  get diagnostic() {
    return JSON.stringify(this.model); }

}
