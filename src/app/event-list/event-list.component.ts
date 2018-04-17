import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { of } from 'rxjs/observable/of';



@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})


export class EventListComponent implements OnInit {
  events: Event[];
  location = {};
  has_position = false;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents({id:"this is a fake object"});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this),this.errorCallback,{maximumAge:60000, timeout:5000, enableHighAccuracy:true})
      this.has_position = true;
    }
  }

  getEvents(data: Object): void {
    this.eventService.getEvents(data)
        .subscribe(events => this.events = events);
  }

  setPosition(position) {
     this.location = position.coords;
     console.log(position.coords);
  }

  errorCallback(error: any) {
    console.log(error);
  }


}
