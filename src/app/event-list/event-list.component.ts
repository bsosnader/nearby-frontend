import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { of } from 'rxjs/observable/of';
import { SharedServiceService } from '../shared-service.service';
import { ActivatedRoute } from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';



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
  token: string;
  searchParam = '';
  notError = true;
  listview: boolean = true;
  constructor(private eventService: EventService, private sharedService: SharedServiceService, private route: ActivatedRoute) {
    sharedService.onLogin$.subscribe(
      bool => {
        this.loggedIn = bool;
      });
    this.route.params.subscribe(params => {
      if (params['term']) {
        this.getEvents({id:"this is a fake object"}, params['term']);
      } else if (params['term'] == '') {
        this.getEvents({id:"this is a fake object"})
      }
    });
   }

  ngOnInit() {
      this.getEvents({id:"this is a fake object"})

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.setPosition.bind(this),this.errorCallback,{maximumAge:60000, timeout:5000, enableHighAccuracy:false})
    //   this.has_position = true;
    // }
    if(localStorage.getItem('id_token')) {
      this.loggedIn = true;
    }
    this.sharedService.onList$.subscribe(
      listview => {
        this.listview = listview;
      });

  }

  getEvents(data: Object, term?: string): void {
    this.eventService.getEvents(data, term)
        .subscribe(events => {
          this.events = events;
          console.log(this.events)
        });
  }

  upvote(id: string, i: number) {
    this.email = JSON.parse(localStorage.getItem('id_token')).username;
    this.token = JSON.parse(localStorage.getItem('id_token')).token;
    this.eventService.postUpvote(this.email, id, this.token)
      .subscribe(res => {
        this.events[i].upvote_count += 1;
      }, error => {
        this.notError = false;
        setTimeout(() => this.notError = true, 5000);

      });
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
