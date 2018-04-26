import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { SharedServiceService } from '../shared-service.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  destination;//: {lng:number,lat:number};
  id: number;
  private sub: any;
  mode: string="WALKING";
  lat: number = 40.7959;
  lng: number = -77.8601;
  origin={ lat: 40.7959, lng: -77.8601 };
  email: string;
  token: string;
  notError = true;
  loggedIn = false;
  comment_name: string;
  comment_comment: string;

  constructor(private route: ActivatedRoute, private eventService: EventService, private sharedService: SharedServiceService) {
    sharedService.onLogin$.subscribe(
      bool => {
        this.loggedIn = bool;
      });
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      console.log(this.id)
      this.getEvent(String(this.id));

   });
   if(localStorage.getItem('id_token')) {
     this.loggedIn = true;
   }
  }
  getEvent(id: string): void {
    this.eventService.getEvent(id)
      .subscribe(event => {
        console.log(event);
        this.event = event;
        console.log(this.event.lat)
        this.destination = {lat:parseFloat(this.event.lat), lng:parseFloat(this.event.lng)};
        console.log(this.destination)
        this.lat = (this.origin.lat+this.destination.lat)/2;
        this.lng = (this.origin.lng+this.destination.lat)/2;
        // console.log(this.destination);
        // console.log(this.lat);
        // console.log(this.lng);
      });
  }

  getVals(cats: any) {
    return cats.map(a => a.title)
  }
  upvote(id: string) {
    this.email = JSON.parse(localStorage.getItem('id_token')).username;
    this.token = JSON.parse(localStorage.getItem('id_token')).token;
    this.eventService.postUpvote(this.email, id, this.token)
      .subscribe(res => {
        this.event.upvote_count += 1;
      }, error => {
        this.notError = false;
        setTimeout(() => this.notError = true, 5000);

      });
  }

  postComment() {
    let comment_obj = {name: this.comment_name, comment: this.comment_comment, event_id: this.event.id}
    this.eventService.postComment(comment_obj, JSON.parse(localStorage.getItem('id_token')).token)
      .subscribe(res => {
        console.log(res)
        this.getEvent(String(this.event.id)
      }, error =>{
        console.error(error)
      })
  }
}
