import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { SharedServiceService } from '../shared-service.service';
import { FileUploader } from 'ng2-file-upload';


interface loc {
  latitude: string;
  longitude: string;
}
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
  origin={ lat: 40.793574, lng: -77.868595 };
  location: loc = {latitude: null, longitude: null}
  email: string;
  token: string;
  notError = true;
  loggedIn = false;
  comment_name: string;
  comment_comment: string;
  uploader = new FileUploader({ url: 'https://nearbyapi.gq/image/upload'});



  constructor(private route: ActivatedRoute, private eventService: EventService, private sharedService: SharedServiceService) {
    sharedService.onLogin$.subscribe(
      bool => {
        this.loggedIn = bool;
      });
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.location.latitude = params['latitude'];
      this.location.longitude = params['longitude'];
      if(this.location.latitude) {
        this.origin = {lat:parseFloat(this.location.latitude), lng:parseFloat(this.location.longitude)}
        this.getEvent(String(this.id));
      } else {
        this.getLocation()
      }
      // In a real app: dispatch action to load the details here.
      console.log(this.id)

   });
   if(localStorage.getItem('id_token')) {
     this.loggedIn = true;
   }
   if (this.loggedIn) {
     this.uploader.onBuildItemForm = (item, form) => {
       form.append("event_id", this.event.id);
       form.append("user_email", JSON.parse(localStorage.getItem('id_token')).username);
     };
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
        if (res.is_upvote) {
          this.event.upvote_count += 1;
        } else {
          this.event.upvote_count -= 1;
        }
      }, error => {
        this.notError = false;
        setTimeout(() => this.notError = true, 5000);
      });
  }
  uploadImage() {
    //this.uploader.queue[0].withCredentials = false //each item has its own value for this. It then gets bound to the XMLHttpRequest. It needs to be false or you'll get a Access-Control-Allow-Credentials error
    this.uploader.authToken = 'JWT ' + JSON.parse(localStorage.getItem('id_token')).token
    this.uploader.uploadAll(); //alternatively you can use uploadAll
    this.uploader.onCompleteItem = (item, response, status, header) => {
      console.log(status)
      if (status == 201) {
        let data = JSON.parse(response);
        //save data.id, data.url, data.secret, etc
        this.getEvent(String(this.event.id))
      }
    }
  }
  postComment() {
    let comment_obj = {name: this.comment_name, comment: this.comment_comment, event_id: this.event.id};
    this.token = JSON.parse(localStorage.getItem('id_token')).token;
    this.eventService.postComment(comment_obj, this.token)
      .subscribe(res => {
        console.log(res);
        this.getEvent(String(this.event.id));
      }, error => {
        console.error(error);
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this),this.errorCallback.bind(this),{maximumAge:60000, timeout:5000, enableHighAccuracy:false})
    }
  }

  setPosition(position) {
    let x = position.coords;
     this.location = {latitude: String(x.latitude).substring(0,10), longitude: String(x.longitude).substring(0,10)};
     this.origin = {lat:parseFloat(this.location.latitude), lng:parseFloat(this.location.longitude)}
     // basically we only get events when we have location, will have to send events with post and handle on backend
     //this.getEvents(position.coords);
     this.getEvent(String(this.id))
  }
  errorCallback(error: any) {
    console.log(error);
    this.getEvent(String(this.id))

  }



}
