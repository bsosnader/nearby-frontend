import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Event } from './event';
import { EVENTS } from './mock-events';


@Injectable()
export class EventService {

  private eventUrl = 'http://ec2-18-188-184-129.us-east-2.compute.amazonaws.com/events/';

  constructor(private http: HttpClient,
  private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  getEvents(data: Object): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl)
    .pipe(
      tap(events => this.log(`fetched events`)),
      catchError(this.handleError('getEvents', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
