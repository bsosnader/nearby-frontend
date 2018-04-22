import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import {EVENTS} from '../mock-events';

@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.css']
})
export class MapsViewComponent implements OnInit {
  events: Event[];
  constructor(private eventService: EventService) { }
  lat: number = 40.7959;
  lng: number = -77.8601;
  zoom: number = 16;
  ngOnInit() {
    this.getEvents();
  }
  getEvents(): void {
    //this.eventService.getEvents()
    //    .subscribe(events => this.events = events);
    this.events = EVENTS;
  }
}
