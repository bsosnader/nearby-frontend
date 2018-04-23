import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { of } from 'rxjs/observable/of';
import { SharedServiceService } from '../shared-service.service';



@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})


export class EventListComponent implements OnInit {
  events: Event[];
  location = {};
  has_position = false;
  loggedIn = false;
  email: string;
  constructor(private eventService: EventService, private sharedService: SharedServiceService) {
    sharedService.onLogin$.subscribe(
      bool => {
        this.loggedIn = bool;
      });
   }

  ngOnInit() {
    this.getEvents({id:"this is a fake object"});
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.setPosition.bind(this),this.errorCallback,{maximumAge:60000, timeout:5000, enableHighAccuracy:false})
    //   this.has_position = true;
    // }
    if(localStorage.getItem('id_token')) {
      this.loggedIn = true;
    }
  }

  getEvents(data: Object): void {
    this.eventService.getEvents(data)
        .subscribe(events => this.events = events);
  }

  upvote() {
    this.email = JSON.parse(localStorage.getItem('id_token')).username;
    console.log(this.email)
  }
  setPosition(position) {
     this.location = position.coords;
     console.log(position.coords);
     // basically we only get events when we have location, will have to send events with post and handle on backend
     //this.getEvents(position.coords);
  }

  errorCallback(error: any) {
    console.log(error);
  }


}
