import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import {EVENTS} from '../mock-events';

@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.css']
})
export class MapsViewComponent implements OnInit {
  @Input() events: Event[];
  constructor(private eventService: EventService) { }
  lat: number = 40.7959;
  lng: number = -77.8601;
  zoom: number = 16;
  ngOnInit() {

  }
  convertString(value){
    return parseFloat(value);
  }
}
