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
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents({id:"this is a fake object"})
  }

  getEvents(data: Object): void {
    this.eventService.getEvents(data)
        .subscribe(events => this.events = events);
  }


}
