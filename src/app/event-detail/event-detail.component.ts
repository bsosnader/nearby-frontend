import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';


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

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      console.log(this.id)
      this.getEvent(String(this.id));

   });
  }
  getEvent(id: string): void {
    this.eventService.getEvent(id)
      .subscribe(event => {
        console.log(event);
        this.event = event;
        console.log(this.destination)
        this.destination = {lat:parseFloat(event.lat), lng:parseFloat(event.long)};
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

}
