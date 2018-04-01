import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Event } from './event';
import { EVENTS } from './mock-events';



@Injectable()
export class EventService {

  constructor() { }

  getEvents(): Observable<Event[]> {
    return of(EVENTS);
  }

}
