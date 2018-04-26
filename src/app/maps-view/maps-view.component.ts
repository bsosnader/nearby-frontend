import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import {EVENTS} from '../mock-events';


interface loc {
  latitude: string;
  longitude: string;
}

@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.css']
})
export class MapsViewComponent implements OnInit {
  @Input() events: Event[];
  @Input() location: loc;
  constructor(private eventService: EventService) { }
  lat: number;
  lng: number;
  zoom: number = 16;
  ngOnInit() {
    if (this.location.latitude) {
      this.lat = parseFloat(this.location.latitude);
      this.lng = parseFloat(this.location.longitude);
    } else {

    }
  }
  convertString(value){
    return parseFloat(value);
  }
}
