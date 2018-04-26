import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { of } from 'rxjs/observable/of';
import { SharedServiceService } from '../shared-service.service';
import { ActivatedRoute } from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';


interface loc {
  latitude: string;
  longitude: string;
}
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})


export class EventListComponent implements OnInit {
  events: Event[];
  location = {latitude: null, longitude: null};
  has_position = false;
  loggedIn = false;
  email: string;
  token: string;
  searchParam = '';
  notError = true;
  listview: boolean = true;
  useFilter = false;
  askForZip = false;
  zipcode: string;
  params;
  error_message = '';
  constructor(private eventService: EventService, private sharedService: SharedServiceService, private route: ActivatedRoute) {
    sharedService.onLogin$.subscribe(
      bool => {
        this.loggedIn = bool;
      });
    this.route.params.subscribe(params => {
      if (params['term']) {
        this.params = params['term'];
        if (this.location.latitude) {
          this.getEvents(this.location, params['term']);
        }
      } else if (params['term'] == '') {
        this.getEvents(this.location)
      }
    });
   }

  ngOnInit() {
    //this.getEvents({id:"this is a fake object"})
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this),this.errorCallback.bind(this),{maximumAge:60000, timeout:5000, enableHighAccuracy:false})
      this.has_position = true;
    }
    if(localStorage.getItem('id_token')) {
      this.loggedIn = true;
    }
    this.sharedService.onList$.subscribe(
      listview => {
        this.listview = listview;
      });

  }

  getEvents(data: loc, term?: string, cat?: string): void {
    console.log(data)
    this.eventService.getEvents(data, term, cat)
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
        if (res.is_upvote) {
          this.events[i].upvote_count += 1;
        } else {
          this.events[i].upvote_count -= 1;
        }
      }, error => {
        this.notError = false;
        this.error_message = 'There was a problem upvoting :('
        setTimeout(() => this.notError = true, 5000);

      });
  }

  setPosition(position) {
    let x = position.coords;
     this.location = {latitude: String(x.latitude).substring(0,10), longitude: String(x.longitude).substring(0,10)};
     // basically we only get events when we have location, will have to send events with post and handle on backend
     //this.getEvents(position.coords);
     this.getEvents(this.location, this.params)
  }

  onFiltered(categories: string) {
    this.getEvents(this.location, this.params, categories);
  }

  errorCallback(error: any) {
    console.log(error);
    this.notError = false;
    this.error_message = 'Location could not be automatically found, please enter zipcode'
    setTimeout(() => this.notError = true, 6000);
    this.askForZip = true;
  }

  getLocFromZip() {
    this.eventService.getLocFromAddr(this.zipcode)
    .subscribe(loc => {
      console.log(loc);
      if(loc.status == "OK") {
        console.log(loc.results[0].geometry.location)
        this.location = { latitude:String(loc.results[0].geometry.location.lat).substring(0,10), longitude: String(loc.results[0].geometry.location.lng).substring(0,10) }
        this.askForZip = false;
        this.has_position = true;
        this.getEvents(this.location, this.params)
      }
    });
  }

  onBadMapLoc(loc: boolean) {
    this.errorCallback("bad loc");
  }


}
